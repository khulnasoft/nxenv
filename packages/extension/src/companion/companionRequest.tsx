import browser from 'webextension-polyfill';
import { initialDataKey } from '@nxenv/shared/src/lib/constants';
import { ExtensionMessageType } from '@nxenv/shared/src/lib/extension';
import { gqlRequest } from '@nxenv/shared/src/graphql/common';
import { graphqlUrl } from '@nxenv/shared/src/lib/config';

const proxyRequest = {
  apply(_, __, args) {
    const { [initialDataKey]: initial, ...variables } = args?.[1];

    browser.runtime.sendMessage({
      type: ExtensionMessageType.GraphQLRequest,
      url: graphqlUrl,
      document: args?.[0],
      variables,
      headers: args?.[2],
    });

    return initial ?? null;
  },
};

export const companionRequest = new Proxy(gqlRequest, proxyRequest);
