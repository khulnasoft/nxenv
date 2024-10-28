import { useContext, useEffect, useRef } from 'react';
import SettingsContext from '@nxenv/shared/src/contexts/SettingsContext';
import { useContentScriptStatus } from '@nxenv/shared/src/hooks';
import { useExtensionContext } from '@nxenv/shared/src/contexts/ExtensionContext';

export const useCompanionSettings = (): void => {
  const isOnLoad = useRef(true);
  const { optOutCompanion, loadedSettings } = useContext(SettingsContext);
  const { registerBrowserContentScripts } = useExtensionContext();
  const { contentScriptGranted } = useContentScriptStatus();

  useEffect(() => {
    if (optOutCompanion || contentScriptGranted || !loadedSettings) {
      return;
    }

    if (isOnLoad.current) {
      isOnLoad.current = false;
      return;
    }

    registerBrowserContentScripts();
    // @NOTE see https://dailydotdev.atlassian.net/l/cp/dK9h1zoM
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optOutCompanion, loadedSettings]);
};
