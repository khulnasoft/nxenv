import React, { ReactElement, useContext } from 'react';
import AuthContext from '@nxenv/shared/src/contexts/AuthContext';
import { Roles } from '@nxenv/shared/src/lib/user';
import { useQuery } from '@tanstack/react-query';
import { RANDOM_PENDING_KEYWORD_QUERY } from '@nxenv/shared/src/graphql/keywords';
import { ResponsivePageContainer } from '@nxenv/shared/src/components/utilities';
import useRequirePermissions from '@nxenv/shared/src/hooks/useRequirePermissions';
import { gqlClient } from '@nxenv/shared/src/graphql/common';
import KeywordManagement from '../../components/KeywordManagement';
import { getLayout as getMainLayout } from '../../components/layouts/MainLayout';

const PendingKeywords = (): ReactElement => {
  useRequirePermissions(Roles.Moderator);
  const { tokenRefreshed } = useContext(AuthContext);

  const {
    data: currentKeywordData,
    refetch: refetchCurrentKeyword,
    isLoading: isLoadingCurrentKeyword,
  } = useQuery({
    queryKey: ['randomPendingKeyword'],
    queryFn: () => gqlClient.request(RANDOM_PENDING_KEYWORD_QUERY),
    enabled: tokenRefreshed,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
  const currentKeyword = currentKeywordData?.keyword;
  const onOperationCompleted = async () => {
    await refetchCurrentKeyword();
  };

  if (isLoadingCurrentKeyword || !currentKeywordData) {
    return <></>;
  }

  if (!isLoadingCurrentKeyword && !currentKeyword) {
    return (
      <ResponsivePageContainer>
        <div className="font-bold typo-title3" data-testid="empty">
          No more keywords! 🥳
        </div>
      </ResponsivePageContainer>
    );
  }

  return (
    <KeywordManagement
      keyword={currentKeyword}
      subtitle={`Only ${currentKeywordData.countPendingKeywords} left!`}
      onOperationCompleted={onOperationCompleted}
    />
  );
};

PendingKeywords.getLayout = getMainLayout;

export default PendingKeywords;
