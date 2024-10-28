import browser from 'webextension-polyfill';
import { contentScriptKey } from '@nxenv/shared/src/hooks';
import {
  companionPermissionGrantedLink,
  isProduction,
} from '@nxenv/shared/src/lib/constants';
import { LogEvent as LogEventName } from '@nxenv/shared/src/lib/log';
import { QueryClient } from '@tanstack/react-query';
import { LogEvent } from '@nxenv/shared/src/hooks/log/useLogQueue';

export type RequestContentScripts = (data: {
  origin: string;
  skipRedirect?: boolean;
}) => Promise<boolean>;

export type CreateRequestContentScripts = (
  client: QueryClient,
  logEvent: (e: LogEvent) => void,
) => RequestContentScripts;

export const HOST_PERMISSIONS = isProduction
  ? ['https://nxenv.khulnasoft.com/*', 'https://*.nxenv.khulnasoft.com/*']
  : ['http://local.com/*', 'http://*.local.com/*'];

let hasInjectedScripts = false;
const companionScriptId = 'daily-companion-app';

export const registerBrowserContentScripts = async (): Promise<void> => {
  if (browser.scripting === undefined) {
    // TODO: this needs to be switched to browser.scripting when bumping FF to V3 as well
    await browser.contentScripts.register({
      matches: ['*://*/*'],
      css: [{ file: 'css/daily-companion-app.css' }],
      js: [
        { file: 'js/content.bundle.js' },
        { file: 'js/companion.bundle.js' },
      ],
    });
  } else {
    const registeredScripts =
      await browser.scripting.getRegisteredContentScripts({
        ids: [companionScriptId],
      });

    if (registeredScripts.length) {
      return null;
    }

    await browser.scripting.registerContentScripts([
      {
        id: companionScriptId,
        matches: ['*://*/*'],
        css: ['css/daily-companion-app.css'],
        js: ['js/content.bundle.js', 'js/companion.bundle.js'],
      },
    ]);
  }

  return null;
};

export const getContentScriptPermission = (): Promise<boolean> =>
  browser.permissions.contains({
    origins: ['*://*/*'],
  });

export const getContentScriptPermissionAndRegister =
  async (): Promise<void> => {
    const permission = await getContentScriptPermission();

    if (permission && !hasInjectedScripts) {
      await registerBrowserContentScripts();
      hasInjectedScripts = true;
    }
  };

export const requestContentScripts: CreateRequestContentScripts = (
  client,
  logEvent,
) => {
  return async ({
    origin,
    skipRedirect,
  }: {
    origin: string;
    skipRedirect?: boolean;
  }) => {
    logEvent({
      event_name: LogEventName.RequestContentScripts,
      extra: JSON.stringify({ origin }),
    });

    const granted = await browser.permissions.request({
      origins: ['*://*/*'],
    });

    if (granted) {
      logEvent({
        event_name: LogEventName.ApproveContentScripts,
        extra: JSON.stringify({ origin }),
      });
      client.setQueryData(contentScriptKey, true);
      await registerBrowserContentScripts();

      if (!skipRedirect) {
        window.open(companionPermissionGrantedLink, '_blank');
      }
    } else {
      logEvent({
        event_name: LogEventName.DeclineContentScripts,
        extra: JSON.stringify({ origin }),
      });
    }

    return granted;
  };
};

export const getHostPermission = (): Promise<boolean> =>
  browser.permissions.contains({
    origins: HOST_PERMISSIONS,
  });

export const promptUninstallExtension = (): Promise<void> =>
  browser.management.uninstallSelf({
    showConfirmDialog: true,
  });
