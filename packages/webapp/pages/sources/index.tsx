import React, { ReactElement } from 'react';
import { GetStaticPropsResult } from 'next';
import { NextSeoProps } from 'next-seo/lib/types';
import { NextSeo } from 'next-seo';

import {
  Button,
  ButtonVariant,
} from '@nxenv/shared/src/components/buttons/Button';
import { PlusIcon, SitesIcon } from '@nxenv/shared/src/components/icons';
import { LazyModal } from '@nxenv/shared/src/components/modals/common/types';
import { useLazyModal } from '@nxenv/shared/src/hooks/useLazyModal';
import { useViewSize, ViewSize } from '@nxenv/shared/src/hooks';
import {
  Source,
  SOURCE_DIRECTORY_QUERY,
} from '@nxenv/shared/src/graphql/sources';
import { IconSize } from '@nxenv/shared/src/components/Icon';
import { ApiError, gqlClient } from '@nxenv/shared/src/graphql/common';
import { useRouter } from 'next/router';
import { BreadCrumbs } from '@nxenv/shared/src/components/header/BreadCrumbs';
import type { GraphQLError } from '@nxenv/shared/src/lib/errors';
import { PageWrapperLayout } from '@nxenv/shared/src/components/layout/PageWrapperLayout';
import { SourceTopList } from '@nxenv/shared/src/components/cards/Leaderboard';
import { getLayout } from '../../components/layouts/MainLayout';
import { getLayout as getFooterNavBarLayout } from '../../components/layouts/FooterNavBarLayout';
import { defaultOpenGraph } from '../../next-seo';
import { getTemplatedTitle } from '../../components/layouts/utils';

const seo: NextSeoProps = {
  title: getTemplatedTitle('Top sources for developer content'),
  openGraph: { ...defaultOpenGraph },
  description:
    'Explore the top sources for developer content on nxenv.khulnasoft.com. Find trending blogs, publications, YouTube channels and more from our trusted developer network.',
};

interface SourcesPageProps {
  mostRecentSources: Source[];
  trendingSources: Source[];
  popularSources: Source[];
  topVideoSources: Source[];
}

const SourcesPage = ({
  mostRecentSources,
  trendingSources,
  popularSources,
  topVideoSources,
}: SourcesPageProps): ReactElement => {
  const { isFallback: isLoading } = useRouter();
  const { openModal } = useLazyModal();
  const isLaptop = useViewSize(ViewSize.Laptop);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <NextSeo {...seo} />
      <PageWrapperLayout className="py-6">
        <div className="flex justify-between">
          <BreadCrumbs>
            <SitesIcon size={IconSize.XSmall} secondary /> Sources
          </BreadCrumbs>
          <Button
            icon={<PlusIcon />}
            variant={isLaptop ? ButtonVariant.Secondary : ButtonVariant.Float}
            className="mb-6 ml-4 tablet:ml-0 laptop:float-right"
            onClick={() => openModal({ type: LazyModal.NewSource })}
          >
            Suggest new source
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 laptopXL:grid-cols-4">
          <SourceTopList
            containerProps={{ title: 'Trending sources' }}
            items={trendingSources}
            isLoading={isLoading}
          />
          <SourceTopList
            containerProps={{ title: 'Popular sources' }}
            items={popularSources}
            isLoading={isLoading}
          />
          <SourceTopList
            containerProps={{ title: 'Recently added sources' }}
            items={mostRecentSources}
            isLoading={isLoading}
          />
          <SourceTopList
            containerProps={{ title: 'Top video sources' }}
            items={topVideoSources}
            isLoading={isLoading}
          />
        </div>
      </PageWrapperLayout>
    </>
  );
};

const getSourcesPageLayout: typeof getLayout = (...props) =>
  getFooterNavBarLayout(getLayout(...props));

SourcesPage.getLayout = getSourcesPageLayout;
SourcesPage.layoutProps = {
  screenCentered: false,
};
export default SourcesPage;

export async function getStaticProps(): Promise<
  GetStaticPropsResult<SourcesPageProps>
> {
  try {
    const res = await gqlClient.request<SourcesPageProps>(
      SOURCE_DIRECTORY_QUERY,
    );

    return {
      props: {
        mostRecentSources: res.mostRecentSources,
        trendingSources: res.trendingSources,
        popularSources: res.popularSources,
        topVideoSources: res.topVideoSources,
      },
      revalidate: 60,
    };
  } catch (err) {
    const error = err as GraphQLError;
    if (
      [ApiError.NotFound, ApiError.Forbidden].includes(
        error?.response?.errors?.[0]?.extensions?.code,
      )
    ) {
      return {
        props: {
          mostRecentSources: [],
          trendingSources: [],
          popularSources: [],
          topVideoSources: [],
        },
        revalidate: 60,
      };
    }
    throw err;
  }
}
