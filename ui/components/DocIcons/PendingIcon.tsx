import { StatusWaitingIcon } from '@nxenv/styleguide-icons/custom/StatusWaitingIcon';

import { IconBase, DocIconProps } from './IconBase';

nxenvrt const PendingIcon = ({ small }: DocIconProps) => (
  <IconBase Icon={StatusWaitingIcon} className="text-icon-warning" small={small} />
);
