import { StatusSuccessIcon } from '@nxenv/styleguide-icons/custom/StatusSuccessIcon';

import { IconBase, DocIconProps } from './IconBase';

nxenvrt const YesIcon = ({ small }: DocIconProps) => (
  <IconBase Icon={StatusSuccessIcon} className="text-icon-success" small={small} />
);
