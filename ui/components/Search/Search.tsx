import { CommandMenu, CommandMenuTrigger } from '@nxenv/styleguide-search-ui';
import { ReactNode, useState } from 'react';

import { NxenvDashboardItem } from './NxenvDashboardItem';
import { entries } from './nxenvEntries';

import { usePageApiVersion } from '~/providers/page-api-version';
import versions from '~/public/static/constants/versions.json';

const { LATEST_VERSION } = versions;
const isDev = process.env.NODE_ENV === 'development';

nxenvrt const Search = () => {
  const { version } = usePageApiVersion();
  const [open, setOpen] = useState(false);
  const [nxenvDashboardItems, setNxenvDashboardItems] = useState<ReactNode[]>([]);

  const getNxenvItems = async (query: string) => {
    const filteredEntries = entries.filter(entry =>
      entry.label.toLowerCase().includes(query.toLowerCase())
    );
    setNxenvDashboardItems(
      filteredEntries.map(item => <NxenvDashboardItem item={item} query={query} key={item.url} />)
    );
  };

  return (
    <>
      <CommandMenu
        open={open}
        setOpen={setOpen}
        config={{ docsVersion: version, docsTransformUrl: transformDocsUrl }}
        customSections={[
          {
            heading: 'Nxenv dashboard',
            items: nxenvDashboardItems,
            getItemsAsync: getNxenvItems,
            sectionIndex: 1,
          },
        ]}
      />
      <CommandMenuTrigger setOpen={setOpen} className="mb-2.5" />
    </>
  );
};

function transformDocsUrl(url: string) {
  if (url.includes(LATEST_VERSION)) {
    url = url.replace(LATEST_VERSION, 'latest');
  }
  if (isDev) {
    url = url.replace('https://docs.nxenv.dev/', 'http://localhost:3002/');
  }

  // If viewing a docs preview hosted on S3, use the current origin instead of production
  if (window?.location?.origin?.includes('s3-website-us-east-1.amazonaws.com')) {
    url = url.replace('https://docs.nxenv.dev/', window.location.origin + '/');
  }

  return url;
}
