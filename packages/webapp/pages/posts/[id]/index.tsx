import React, { CSSProperties, ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { NextSeo } from 'next-seo';
import {
  Post,
  POST_BY_ID_STATIC_FIELDS_QUERY,
  PostData,
  PostType,
} from '@nxenv/shared/src/graphql/posts';
import { NextSeoProps } from 'next-seo/lib/types';
import Head from 'next/head';
import { ClientError } from 'graphql-request';
import { SCROLL_OFFSET } from '@nxenv/shared/src/components/post/PostContent';
import { useScrollTopOffset } from '@nxenv/shared/src/hooks/useScrollTopOffset';
import { Origin } from '@nxenv/shared/src/lib/log';
import usePostById from '@nxenv/shared/src/hooks/usePostById';
import { usePrivateSourceJoin } from '@nxenv/shared/src/hooks/source/usePrivateSourceJoin';
import { ApiError, gqlClient } from '@nxenv/shared/src/graphql/common';
import PostLoadingSkeleton from '@nxenv/shared/src/components/post/PostLoadingSkeleton';
import classNames from 'classnames';
import { AuthenticationBanner } from '@nxenv/shared/src/components/auth';
import { useOnboarding } from '@nxenv/shared/src/hooks/auth/useOnboarding';
import {
  useJoinReferral,
  useViewSize,
  ViewSize,
} from '@nxenv/shared/src/hooks';
import CustomAuthBanner from '@nxenv/shared/src/components/auth/CustomAuthBanner';
import { webappUrl } from '@nxenv/shared/src/lib/constants';
import { useFeatureTheme } from '@nxenv/shared/src/hooks/utils/useFeatureTheme';
import { getTemplatedTitle } from '../../../components/layouts/utils';
import { getLayout } from '../../../components/layouts/MainLayout';
import FooterNavBarLayout from '../../../components/layouts/FooterNavBarLayout';
import {
  getSeoDescription,
  PostSEOSchema,
} from '../../../components/PostSEOSchema';

const Custom404 = dynamic(
  () => import(/* webpackChunkName: "404" */ '../../404'),
);

const PostContent = dynamic(() =>
  import(
    /* webpackChunkName: "lazyPostContent" */ '@nxenv/shared/src/components/post/PostContent'
  ).then((module) => module.PostContent),
);

const SquadPostContent = dynamic(() =>
  import(
    /* webpackChunkName: "lazySquadPostContent" */ '@nxenv/shared/src/components/post/SquadPostContent'
  ).then((module) => module.SquadPostContent),
);

const CollectionPostContent = dynamic(() =>
  import(
    /* webpackChunkName: "lazyCollectionPostContent" */ '@nxenv/shared/src/components/post/collection'
  ).then((module) => module.CollectionPostContent),
);

export interface Props {
  id: string;
  initialData?: PostData;
}

const CONTENT_MAP: Record<PostType, typeof PostContent> = {
  article: PostContent,
  share: SquadPostContent,
  welcome: SquadPostContent,
  freeform: SquadPostContent,
  [PostType.VideoYouTube]: PostContent,
  collection: CollectionPostContent,
};

interface PostParams extends ParsedUrlQuery {
  id: string;
}

const seoTitle = (post: Post) => {
  if (post?.type === PostType.Share && post?.title === null) {
    return `Shared post at ${post?.source?.name}`;
  }

  return post?.title;
};

const PostPage = ({ id, initialData }: Props): ReactElement => {
  useJoinReferral();
  const [position, setPosition] =
    useState<CSSProperties['position']>('relative');
  const router = useRouter();
  const { isFallback } = router;
  const { shouldShowAuthBanner } = useOnboarding();
  const isLaptop = useViewSize(ViewSize.Laptop);
  const { post, isError, isLoading } = usePostById({
    id,
    options: {
      initialData,
      retry: false,
    },
  });
  const featureTheme = useFeatureTheme();
  const containerClass = classNames(
    'mb-16 min-h-page max-w-screen-laptop tablet:mb-8 laptop:mb-0 laptop:pb-6 laptopL:pb-0',
    [PostType.Share, PostType.Welcome, PostType.Freeform].includes(post?.type),
    featureTheme && 'bg-transparent',
  );

  const seo: NextSeoProps = {
    canonical: post?.slug ? `${webappUrl}posts/${post.slug}` : undefined,
    title: getTemplatedTitle(seoTitle(post)),
    description: getSeoDescription(post),
    openGraph: {
      images: [{ url: `https://og.nxenv.khulnasoft.com/api/posts/${post?.id}` }],
      article: {
        publishedTime: post?.createdAt,
        tags: post?.tags,
      },
    },
  };

  useScrollTopOffset(() => globalThis.window, {
    onOverOffset: () => position !== 'fixed' && setPosition('fixed'),
    onUnderOffset: () => position !== 'relative' && setPosition('relative'),
    offset: SCROLL_OFFSET,
    scrollProperty: 'scrollY',
  });

  const privateSourceJoin = usePrivateSourceJoin({ postId: id });

  if (isLoading || isFallback || privateSourceJoin.isActive) {
    return (
      <>
        <PostSEOSchema post={post} />
        {post?.title?.length && <NextSeo {...seo} />}
        <PostLoadingSkeleton className={containerClass} type={post?.type} />
      </>
    );
  }

  const Content = CONTENT_MAP[post?.type];

  if (!Content || isError) {
    return <Custom404 />;
  }

  return (
    <FooterNavBarLayout post={post}>
      <Head>
        <link rel="preload" as="image" href={post?.image} />
      </Head>
      <NextSeo {...seo} />
      <PostSEOSchema post={post} />
      <Content
        position={position}
        isPostPage
        post={post}
        isFallback={isFallback}
        backToSquad={!!router?.query?.squad}
        shouldOnboardAuthor={!!router.query?.author}
        origin={Origin.ArticlePage}
        isBannerVisible={shouldShowAuthBanner && !isLaptop}
        className={{
          container: containerClass,
          fixedNavigation: { container: 'flex laptop:hidden' },
          navigation: {
            container: 'flex tablet:hidden',
            actions: 'flex-1 justify-between',
          },
          content: 'laptop:pt-8',
        }}
      />
      {shouldShowAuthBanner && isLaptop && <AuthenticationBanner />}
    </FooterNavBarLayout>
  );
};

PostPage.getLayout = getLayout;
PostPage.layoutProps = {
  screenCentered: false,
  customBanner: <CustomAuthBanner />,
};

export default PostPage;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return { paths: [], fallback: true };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PostParams>): Promise<GetStaticPropsResult<Props>> {
  const { id } = params;
  try {
    const initialData = await gqlClient.request<PostData>(
      POST_BY_ID_STATIC_FIELDS_QUERY,
      { id },
    );
    return {
      props: {
        id: initialData.post.id,
        initialData,
      },
      revalidate: 60,
    };
  } catch (err) {
    const clientError = err as ClientError;
    const errors = Object.values(ApiError);
    if (errors.includes(clientError?.response?.errors?.[0]?.extensions?.code)) {
      const { postId } = clientError.response.errors[0].extensions;

      return {
        props: { id: postId || id },
        revalidate: 60,
      };
    }
    throw err;
  }
}
