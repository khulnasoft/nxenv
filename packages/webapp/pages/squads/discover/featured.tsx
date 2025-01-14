import React, { ReactElement } from 'react';
import { NextSeoProps } from 'next-seo/lib/types';
import { NextSeo } from 'next-seo';
import InfiniteScrolling, {
  checkFetchMore,
} from '@nxenv/shared/src/components/containers/InfiniteScrolling';
import { InfiniteData } from '@tanstack/react-query';
import { FeedContainer, SquadGrid } from '@nxenv/shared/src/components';
import { Squad } from '@nxenv/shared/src/graphql/sources';
import CustomAuthBanner from '@nxenv/shared/src/components/auth/CustomAuthBanner';
import {
  SourcesQueryData,
  useSources,
} from '@nxenv/shared/src/hooks/source/useSources';
import { useViewSize, ViewSize } from '@nxenv/shared/src/hooks';
import { SquadList } from '@nxenv/shared/src/components/cards/squad/SquadList';
import { PlaceholderSquadGridList } from '@nxenv/shared/src/components/cards/squad/PlaceholderSquadGrid';
import { PlaceholderSquadListList } from '@nxenv/shared/src/components/cards/squad/PlaceholderSquadList';
import { SquadDirectoryLayout } from '../../../../shared/src/components/squads/layout/SquadDirectoryLayout';
import { getTemplatedTitle } from '../../../components/layouts/utils';
import { defaultOpenGraph } from '../../../next-seo';
import { getLayout } from '../../../components/layouts/FeedLayout';
import { mainFeedLayoutProps } from '../../../components/layouts/MainFeedPage';

export type Props = {
  initialData?: InfiniteData<SourcesQueryData<Squad>>;
};

const seo: NextSeoProps = {
  title: getTemplatedTitle('Explore the featured Squads'),
  openGraph: { ...defaultOpenGraph },
  description: `Explore nxenv.khulnasoft.com’s featured Squads, handpicked by our editors. Join the best developer communities and engage in top discussions today.`,
};

const Skeleton = (): ReactElement => (
  <>
    <FeedContainer className="!hidden tablet:!flex">
      <PlaceholderSquadGridList isFeatured />
    </FeedContainer>
    <div className="flex flex-col gap-3 tablet:!hidden" role="list">
      <PlaceholderSquadListList />
    </div>
  </>
);

const SquadsPage = (): ReactElement => {
  const { result } = useSources<Squad>({
    query: { featured: true, isPublic: true, sortByMembersCount: true },
  });
  const { isInitialLoading } = result;
  const flatSquads =
    result.data?.pages.flatMap((page) => page.sources.edges) ?? [];
  const isTablet = useViewSize(ViewSize.Tablet);

  return (
    <SquadDirectoryLayout>
      <NextSeo {...seo} />
      <InfiniteScrolling
        isFetchingNextPage={result.isFetchingNextPage}
        canFetchMore={checkFetchMore(result)}
        fetchNextPage={result.fetchNextPage}
        className="w-full"
      >
        {isTablet ? (
          <FeedContainer>
            {flatSquads?.map(({ node }) => (
              <SquadGrid key={node.id} source={node} />
            ))}
          </FeedContainer>
        ) : (
          <div className="flex flex-col gap-3" role="list">
            {flatSquads.map(({ node }) => (
              <SquadList role="listitem" key={node.id} squad={node} />
            ))}
          </div>
        )}
      </InfiniteScrolling>
      {isInitialLoading && <Skeleton />}
    </SquadDirectoryLayout>
  );
};

SquadsPage.getLayout = getLayout;
SquadsPage.layoutProps = {
  ...mainFeedLayoutProps,
  customBanner: <CustomAuthBanner />,
};

export default SquadsPage;
