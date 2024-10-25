import { AlertTriangleSolidIcon } from '@nxenv/styleguide-icons/solid/AlertTriangleSolidIcon';

import { IconBase, DocIconProps } from './IconBase';

nxenvrt const WarningIcon = ({ small }: DocIconProps) => (
  <IconBase Icon={AlertTriangleSolidIcon} className="text-icon-warning" small={small} />
);
