import React, { ReactElement, ReactNode, useMemo, useState } from 'react';
import { useFeedLayout } from '@nxenv/shared/src/hooks';
import { useAuthContext } from '@nxenv/shared/src/contexts/AuthContext';
import {
  generateQueryKey,
  OtherFeedPage,
  RequestKey,
} from '@nxenv/shared/src/lib/query';
import Feed, { FeedProps } from '@nxenv/shared/src/components/Feed';
import {
  FEED_BY_IDS_QUERY,
  supportedTypesForPrivateSources,
} from '@nxenv/shared/src/graphql/feed';
import { FeedPageHeader } from '@nxenv/shared/src/components/utilities';
import { useRouter } from 'next/router';

export type FeedByIdsLayoutProps = {
  children?: ReactNode;
};

export default function FeedByIdsLayout({
  children,
}: FeedByIdsLayoutProps): ReactElement {
  const router = useRouter();
  const { FeedPageLayoutComponent } = useFeedLayout();
  const { user, tokenRefreshed } = useAuthContext();
  const [showEmptyScreen, setShowEmptyScreen] = useState(false);
  const defaultKey = generateQueryKey(RequestKey.FeedByIds, user);
  const ids = router.query?.id;
  const feedProps = useMemo<FeedProps<unknown>>(() => {
    return {
      feedName: OtherFeedPage.FeedByIds,
      feedQueryKey: defaultKey,
      query: FEED_BY_IDS_QUERY,
      variables: {
        supportedTypes: supportedTypesForPrivateSources,
        postIds: ids,
      },
      disableAds: true,
      onEmptyFeed: () => setShowEmptyScreen(true),
      options: { refetchOnMount: true },
    };
    // @NOTE see https://dailydotdev.atlassian.net/l/cp/dK9h1zoM
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, ids]);

  if (showEmptyScreen || !ids || !ids.length) {
    return <p>No posts found</p>;
  }

  return (
    <FeedPageLayoutComponent>
      {children}
      <FeedPageHeader className="mb-5">
        <h1 className="font-bold typo-callout">Feed by IDs</h1>
      </FeedPageHeader>
      {tokenRefreshed && <Feed {...feedProps} />}
    </FeedPageLayoutComponent>
  );
}
