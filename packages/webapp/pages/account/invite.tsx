import React, { ReactElement, useMemo, useRef } from 'react';
import {
  ReferralCampaignKey,
  useReferralCampaign,
} from '@nxenv/shared/src/hooks';
import { link } from '@nxenv/shared/src/lib/links';
import { labels } from '@nxenv/shared/src/lib';
import {
  generateQueryKey,
  getNextPageParam,
  RequestKey,
} from '@nxenv/shared/src/lib/query';
import { useAuthContext } from '@nxenv/shared/src/contexts/AuthContext';
import { REFERRED_USERS_QUERY } from '@nxenv/shared/src/graphql/users';
import UserList from '@nxenv/shared/src/components/profile/UserList';
import { checkFetchMore } from '@nxenv/shared/src/components/containers/InfiniteScrolling';
import {
  ReferredUsersData,
  gqlClient,
} from '@nxenv/shared/src/graphql/common';
import { SocialShareList } from '@nxenv/shared/src/components/widgets/SocialShareList';
import { Separator } from '@nxenv/shared/src/components/cards/common/common';
import { UserShortProfile } from '@nxenv/shared/src/lib/user';
import { format } from 'date-fns';
import { IconSize } from '@nxenv/shared/src/components/Icon';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLogContext } from '@nxenv/shared/src/contexts/LogContext';
import {
  LogEvent,
  TargetId,
  TargetType,
} from '@nxenv/shared/src/lib/log';
import { ShareProvider } from '@nxenv/shared/src/lib/share';
import { useShareOrCopyLink } from '@nxenv/shared/src/hooks/useShareOrCopyLink';
import { InviteLinkInput } from '@nxenv/shared/src/components/referral';
import { TruncateText } from '@nxenv/shared/src/components/utilities';
import AccountContentSection from '../../components/layouts/AccountLayout/AccountContentSection';
import { AccountPageContainer } from '../../components/layouts/AccountLayout/AccountPageContainer';
import { getAccountLayout } from '../../components/layouts/AccountLayout';
import { InviteIcon } from '../../../shared/src/components/icons';

const AccountInvitePage = (): ReactElement => {
  const { user } = useAuthContext();
  const container = useRef<HTMLDivElement>();
  const referredKey = generateQueryKey(RequestKey.ReferredUsers, user);
  const { url, referredUsersCount } = useReferralCampaign({
    campaignKey: ReferralCampaignKey.Generic,
  });
  const { logEvent } = useLogContext();
  const inviteLink = url || link.referral.defaultUrl;
  const [, onShareOrCopyLink] = useShareOrCopyLink({
    text: labels.referral.generic.inviteText,
    link: inviteLink,
    logObject: () => ({
      event_name: LogEvent.CopyReferralLink,
      target_id: TargetId.InviteFriendsPage,
    }),
  });
  const usersResult = useInfiniteQuery<ReferredUsersData>({
    queryKey: referredKey,
    queryFn: ({ pageParam }) =>
      gqlClient.request(REFERRED_USERS_QUERY, {
        after: typeof pageParam === 'string' ? pageParam : undefined,
      }),
    initialPageParam: '',
    getNextPageParam: ({ referredUsers }) =>
      getNextPageParam(referredUsers?.pageInfo),
  });
  const users: UserShortProfile[] = useMemo(() => {
    const list = [];
    usersResult.data?.pages.forEach((page) => {
      page?.referredUsers.edges.forEach(({ node }) => {
        list.push(node);
      });
    }, []);

    return list;
  }, [usersResult]);

  const onLogShare = (provider: ShareProvider) => {
    logEvent({
      event_name: LogEvent.InviteReferral,
      target_id: provider,
      target_type: TargetType.InviteFriendsPage,
    });
  };

  return (
    <AccountPageContainer title="Invite friends">
      <InviteLinkInput
        link={inviteLink}
        logProps={{
          event_name: LogEvent.CopyReferralLink,
          target_id: TargetId.InviteFriendsPage,
        }}
      />
      <span className="my-4 p-0.5 font-bold text-text-tertiary typo-callout">
        or invite via
      </span>
      <div className="flex flex-row flex-wrap gap-2 gap-y-4">
        <SocialShareList
          link={inviteLink}
          description={labels.referral.generic.inviteText}
          onNativeShare={onShareOrCopyLink}
          onClickSocial={onLogShare}
          shortenUrl={false}
        />
      </div>
      <AccountContentSection
        title="Buddies you brought onboard"
        description="Meet the developers who joined nxenv.khulnasoft.com through your invite. They might just be your ticket to future rewards 😉"
      >
        <UserList
          users={users}
          isLoading={usersResult?.isLoading}
          scrollingProps={{
            isFetchingNextPage: usersResult.isFetchingNextPage,
            canFetchMore: checkFetchMore(usersResult),
            fetchNextPage: usersResult.fetchNextPage,
            className: 'mt-4',
          }}
          emptyPlaceholder={
            <div className="mt-16 flex flex-col items-center text-text-secondary">
              <InviteIcon size={IconSize.XXXLarge} />
              <p className="mt-2 typo-body">No referred members found</p>
            </div>
          }
          userInfoProps={{
            scrollingContainer: container.current,
            className: {
              container: 'px-0 py-3 items-center',
              textWrapper: 'flex-none',
            },
            transformUsername({
              username,
              createdAt,
            }: UserShortProfile): React.ReactNode {
              return (
                <span className="flex text-text-secondary typo-callout">
                  <TruncateText>@{username}</TruncateText>
                  <Separator />
                  <time dateTime={createdAt}>
                    {format(new Date(createdAt), 'dd MMM yyyy')}
                  </time>
                </span>
              );
            },
          }}
          placeholderAmount={referredUsersCount}
        />
      </AccountContentSection>
    </AccountPageContainer>
  );
};

AccountInvitePage.getLayout = getAccountLayout;

export default AccountInvitePage;
