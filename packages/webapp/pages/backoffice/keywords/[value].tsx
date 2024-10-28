import React, { ReactElement, useContext } from 'react';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { KEYWORD_QUERY } from '@nxenv/shared/src/graphql/keywords';
import { useQuery } from '@tanstack/react-query';
import useRequirePermissions from '@nxenv/shared/src/hooks/useRequirePermissions';
import { Roles } from '@nxenv/shared/src/lib/user';
import AuthContext from '@nxenv/shared/src/contexts/AuthContext';
import { gqlClient } from '@nxenv/shared/src/graphql/common';
import Custom404 from '../../404';
import { getLayout as getMainLayout } from '../../../components/layouts/MainLayout';
import KeywordManagement from '../../../components/KeywordManagement';

export type KeywordPageProps = { keyword: string };

const KeywordPage = ({
  keyword: keywordValue,
}: KeywordPageProps): ReactElement => {
  useRequirePermissions(Roles.Moderator);
  const { tokenRefreshed } = useContext(AuthContext);

  const { data: keywordData, isLoading: isLoadingKeyword } = useQuery({
    queryKey: ['keyword', keywordValue],
    queryFn: () => gqlClient.request(KEYWORD_QUERY, { value: keywordValue }),
    enabled: tokenRefreshed && !!keywordValue,
  });

  if (isLoadingKeyword || !keywordData) {
    return <></>;
  }

  const { keyword } = keywordData;
  if (!keyword) {
    return <Custom404 />;
  }

  return (
    <KeywordManagement
      keyword={keyword}
      subtitle={`Status: ${keyword.status}`}
    />
  );
};

KeywordPage.getLayout = getMainLayout;

export default KeywordPage;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return { paths: [], fallback: true };
}

interface KeywordParams extends ParsedUrlQuery {
  value: string;
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<KeywordParams>): Promise<
  GetStaticPropsResult<KeywordPageProps>
> {
  const { value } = params;
  return {
    props: {
      keyword: value,
    },
    revalidate: 60,
  };
}
