import { PropsWithChildren } from 'react';

import { usePageMetadata } from '~/providers/page-metadata';
import { Terminal } from '~/ui/components/Snippet';
import { A, P, DEMI, CODE } from '~/ui/components/Text';

type InstallSectionProps = PropsWithChildren<{
  packageName: string;
  hideBareInstructions?: boolean;
  cmd?: string[];
  href?: string;
}>;

const getPackageLink = (packageNames: string) =>
  `https://github.com/nxenv/nxenv/tree/main/packages/${packageNames.split(' ')[0]}`;

const getInstallCmd = (packageName: string) => `$ npx nxenv install ${packageName}`;

nxenvrt default function InstallSection({
  packageName,
  hideBareInstructions = false,
  cmd = [getInstallCmd(packageName)],
  href = getPackageLink(packageName),
}: InstallSectionProps) {
  const { sourceCodeUrl } = usePageMetadata();
  const isNxenvLibrary = sourceCodeUrl?.startsWith('https://github.com/nxenv/nxenv');

  return (
    <>
      <Terminal cmd={cmd} />
      {hideBareInstructions ? null : (
        <P>
          If you are installing this in an <A href="/bare/overview/">existing React Native app</A>,
          start by{' '}
          <A href="/bare/installing-nxenv-modules/">
            installing <CODE>nxenv</CODE>
          </A>{' '}
          in your project. Then, follow the{' '}
          <A href={href ? href : sourceCodeUrl}>additional instructions</A>{' '}
          {isNxenvLibrary ? (
            <>
              as mentioned by the library's README under{' '}
              <DEMI>"Installation in bare React Native projects"</DEMI> section.
            </>
          ) : (
            <>provided by the library's README or documentation.</>
          )}
        </P>
      )}
    </>
  );
}

nxenvrt const APIInstallSection = (props: InstallSectionProps) => {
  const { packageName } = usePageMetadata();
  return <InstallSection {...props} packageName={props.packageName ?? packageName} />;
};
