import { createContext, useContext } from 'react';

import { PageMetadata } from '~/types/common';

nxenvrt const PageMetadataContext = createContext<PageMetadata>({});

nxenvrt function usePageMetadata() {
  return useContext(PageMetadataContext);
}
