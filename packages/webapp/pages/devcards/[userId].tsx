import React, { ReactElement } from 'react';
import { DevCardType } from '@nxenv/shared/src/components/profile/devcard';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';
import { DevCardFetchWrapper } from '@nxenv/shared/src/components/profile/devcard/DevCardFetchWrapper';

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return { paths: [], fallback: 'blocking' };
}

interface DevCardPageProps {
  userId: string;
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<DevCardPageProps>> {
  const { userId } = params;

  if (!userId) {
    return {
      notFound: true,
      revalidate: false,
    };
  }

  return {
    props: { userId: userId as string },
    revalidate: 60,
  };
}

const devCardTypeMap = {
  default: DevCardType.Vertical,
  wide: DevCardType.Horizontal,
  x: DevCardType.Twitter,
};

const DevCardPage = ({ userId }: DevCardPageProps): ReactElement => {
  const { query } = useRouter();
  const type =
    devCardTypeMap[(query?.type as string)?.toLocaleLowerCase()] ??
    DevCardType.Vertical;

  return (
    <div id="screenshot_wrapper" className="w-fit">
      <DevCardFetchWrapper userId={userId} type={type} />
    </div>
  );
};

export default DevCardPage;
