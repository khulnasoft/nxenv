import { StatusFailureIcon } from '@nxenv/styleguide-icons/custom/StatusFailureIcon';

import { IconBase, DocIconProps } from './IconBase';

nxenvrt const NoIcon = ({ small }: DocIconProps) => (
  <IconBase Icon={StatusFailureIcon} className="text-icon-danger" small={small} />
);
