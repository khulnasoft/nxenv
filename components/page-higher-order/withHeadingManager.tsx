import * as React from 'react';

import { HeadingManager } from '~/common/headingManager';

nxenvrt const HeadingsContext = React.createContext<HeadingManager | null>(null);

nxenvrt type HeadingManagerProps = { headingManager: HeadingManager };

const withHeadingManager =
  <P extends object>(
    Component: React.ComponentType<React.PropsWithChildren<P & HeadingManagerProps>>
  ) =>
  (props: React.PropsWithChildren<P>) => (
    <HeadingsContext.Consumer>
      {headingManager => <Component headingManager={headingManager!} {...props} />}
    </HeadingsContext.Consumer>
  );

nxenvrt default withHeadingManager;
