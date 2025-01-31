import React, { ReactElement } from 'react';
import { NextSeoProps } from 'next-seo/lib/types';
import { NextSeo } from 'next-seo';
import {
  getMainFeedLayout,
  mainFeedLayoutProps,
} from '../../components/layouts/MainFeedPage';
import { defaultOpenGraph } from '../../next-seo';
import { getTemplatedTitle } from '../../components/layouts/utils';

const seo: NextSeoProps = {
  title: getTemplatedTitle('Explore trending developer posts'),
  openGraph: { ...defaultOpenGraph },
  description:
    'Discover the latest trending developer posts from across the web. Stay updated with popular discussions, curated content, and more on nxenv.khulnasoft.com.',
};

const Posts = (): ReactElement => {
  return <NextSeo {...seo} />;
};

Posts.getLayout = getMainFeedLayout;
Posts.layoutProps = mainFeedLayoutProps;

export default Posts;
