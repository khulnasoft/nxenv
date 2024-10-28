import React, { ReactElement } from 'react';
import { NextSeoProps } from 'next-seo/lib/types';
import { NextSeo, SiteLinksSearchBoxJsonLd } from 'next-seo';
import {
  getMainFeedLayout,
  mainFeedLayoutProps,
} from '../components/layouts/MainFeedPage';
import { defaultOpenGraph, defaultSeo, defaultSeoTitle } from '../next-seo';

const seo: NextSeoProps = {
  title: defaultSeoTitle,
  openGraph: { ...defaultOpenGraph },
  ...defaultSeo,
};

const Home = (): ReactElement => {
  return (
    <>
      <NextSeo {...seo} />
      <SiteLinksSearchBoxJsonLd
        url="https://app.nxenv.khulnasoft.com"
        potentialActions={[
          {
            target: 'https://app.nxenv.khulnasoft.com/search?q',
            queryInput: 'search_term_string',
          },
        ]}
      />
    </>
  );
};

Home.getLayout = getMainFeedLayout;
Home.layoutProps = mainFeedLayoutProps;

export default Home;
