import React, { ReactElement, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ProfileReadingData,
  USER_READING_HISTORY_QUERY,
} from '@nxenv/shared/src/graphql/users';
import AuthContext from '@nxenv/shared/src/contexts/AuthContext';
import { useActivityTimeFilter } from '@nxenv/shared/src/hooks/profile/useActivityTimeFilter';
import { ReadingTagsWidget } from '@nxenv/shared/src/components/profile/ReadingTagsWidget';
import { ReadingHeatmapWidget } from '@nxenv/shared/src/components/profile/ReadingHeatmapWidget';
import {
  generateQueryKey,
  RequestKey,
} from '@nxenv/shared/src/lib/query';
import { Readme } from '@nxenv/shared/src/components/profile/Readme';
import { useProfile } from '@nxenv/shared/src/hooks/profile/useProfile';
import { useJoinReferral } from '@nxenv/shared/src/hooks';
import { useReadingStreak } from '@nxenv/shared/src/hooks/streaks';
import { gqlClient } from '@nxenv/shared/src/graphql/common';
import { useProfileContentPreferenceMutationSubscription } from '@nxenv/shared/src/hooks/profile/useProfileContentPreferenceMutationSubscription';
import { NextSeo } from 'next-seo';
import { NextSeoProps } from 'next-seo/lib/types';
import {
  getLayout as getProfileLayout,
  getProfileSeoDefaults,
  getStaticPaths as getProfileStaticPaths,
  getStaticProps as getProfileStaticProps,
  ProfileLayoutProps,
} from '../../components/layouts/ProfileLayout';
import { ReadingStreaksWidget } from '../../../shared/src/components/profile/ReadingStreaksWidget';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProfilePage = ({
  user: initialUser,
  noindex,
}: ProfileLayoutProps): ReactElement => {
  useJoinReferral();
  const { tokenRefreshed } = useContext(AuthContext);
  const { isStreaksEnabled } = useReadingStreak();

  const { selectedHistoryYear, before, after, yearOptions, fullHistory } =
    useActivityTimeFilter();

  const { user, userQueryKey } = useProfile(initialUser);
  useProfileContentPreferenceMutationSubscription({
    queryKey: userQueryKey,
  });

  const { data: readingHistory, isLoading } = useQuery<ProfileReadingData>({
    queryKey: generateQueryKey(
      RequestKey.ReadingStats,
      user,
      selectedHistoryYear,
    ),

    queryFn: () =>
      gqlClient.request(USER_READING_HISTORY_QUERY, {
        id: user?.id,
        before,
        after,
        version: 2,
        limit: 6,
      }),
    enabled: !!user && tokenRefreshed && !!before && !!after,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const seo: NextSeoProps = {
    ...getProfileSeoDefaults(user, {}, noindex),
  };

  return (
    <>
      <NextSeo {...seo} />
      <div className="flex flex-col gap-6 px-4 py-6 tablet:px-6">
        <Readme user={user} />
        {isStreaksEnabled && readingHistory?.userStreakProfile && (
          <ReadingStreaksWidget
            streak={readingHistory?.userStreakProfile}
            isLoading={isLoading}
          />
        )}
        {readingHistory?.userReadingRankHistory && (
          <>
            <ReadingTagsWidget
              mostReadTags={readingHistory?.userMostReadTags}
            />
            <ReadingHeatmapWidget
              fullHistory={fullHistory}
              selectedHistoryYear={selectedHistoryYear}
              readHistory={readingHistory?.userReadHistory}
              before={before}
              after={after}
              yearOptions={yearOptions}
            />
          </>
        )}
      </div>
    </>
  );
};

ProfilePage.getLayout = getProfileLayout;
export default ProfilePage;

export const getStaticProps = getProfileStaticProps;
export const getStaticPaths = getProfileStaticPaths;
