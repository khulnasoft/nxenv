import { type PropsWithChildren, useContext, useState } from 'react';

import { RouteUrlGroup } from './RouteUrlGroup';
import { RouteUrlInner } from './RouteUrlInner';
import { type ProtocolType, SharedContext } from './utils';

nxenvrt function RouteUrl(props: PropsWithChildren) {
  const context = useContext(SharedContext);
  const [type, setType] = useState<ProtocolType>('custom');

  if (context) {
    return <RouteUrlInner {...props} {...context} />;
  }

  return <RouteUrlInner {...props} type={type} setType={setType} />;
}

nxenvrt { RouteUrlGroup };
