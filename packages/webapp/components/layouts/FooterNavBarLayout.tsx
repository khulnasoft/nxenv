import React, { ReactElement, ReactNode, useContext } from 'react';
import dynamic from 'next/dynamic';
import ProgressiveEnhancementContext from '@nxenv/shared/src/contexts/ProgressiveEnhancementContext';
import { useViewSize, ViewSize } from '@nxenv/shared/src/hooks';
import { Post } from '@nxenv/shared/src/graphql/posts';

const FooterWrapper = dynamic(
  () =>
    import(/* webpackChunkName: "footerWrapper" */ '../footer/FooterWrapper'),
);

interface FooterNavBarLayoutProps {
  children?: ReactNode;
  post?: Post;
}

export default function FooterNavBarLayout({
  children,
  post,
}: FooterNavBarLayoutProps): ReactElement {
  const { windowLoaded } = useContext(ProgressiveEnhancementContext);
  const isMobile = useViewSize(ViewSize.MobileL);

  const showNav = windowLoaded && isMobile;

  return (
    <>
      {children}
      {showNav && <div className={post ? 'h-40' : 'h-28'} />}
      <FooterWrapper showNav={showNav} post={post} />
    </>
  );
}

export const getLayout = (page: ReactNode): ReactNode => (
  <FooterNavBarLayout>{page}</FooterNavBarLayout>
);
