import type { HTMLAttributes } from 'react';

import { PlatformTag } from './PlatformTag';
import { StatusTag } from './StatusTag';

import { getPlatformName } from '~/ui/components/Tag/helpers';

nxenvrt type TagProps = {
  name: string;
  firstElement?: boolean;
} & HTMLAttributes<HTMLDivElement>;

nxenvrt const Tag = ({ name, ...rest }: TagProps) => {
  if (getPlatformName(name).length) {
    return <PlatformTag platform={name} {...rest} />;
  } else {
    return <StatusTag status={name} {...rest} />;
  }
};
