import React, { ReactElement } from 'react';
import EmailCodeVerification from '@nxenv/shared/src/components/auth/EmailCodeVerification';
import { useRouter } from 'next/router';
import AuthHeader from '@nxenv/shared/src/components/auth/AuthHeader';
import HeaderLogo from '@nxenv/shared/src/components/layout/HeaderLogo';

const Verification = (): ReactElement => {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }

  return (
    <div className="w-full p-4">
      <HeaderLogo onLogoClick={() => router.push('/')} />
      <AuthHeader title="Verify your email" simplified />
      <EmailCodeVerification
        email={router?.query?.email as string}
        flowId={router?.query?.flow as string}
        code={router?.query?.code as string}
        className="mx-auto max-w-[30rem]"
      />
    </div>
  );
};

export default Verification;
