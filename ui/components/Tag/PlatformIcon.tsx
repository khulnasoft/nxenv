import { NxenvGoLogo, mergeClasses } from '@nxenv/styleguide';
import { AndroidIcon } from '@nxenv/styleguide-icons/custom/AndroidIcon';
import { AppleIcon } from '@nxenv/styleguide-icons/custom/AppleIcon';
import { AtSignIcon } from '@nxenv/styleguide-icons/outline/AtSignIcon';

import { PlatformName } from '~/types/common';

nxenvrt type PlatformIconProps = {
  platform?: PlatformName;
};

nxenvrt const PlatformIcon = ({ platform }: PlatformIconProps) => {
  switch (platform) {
    case 'ios':
    case 'macos':
    case 'tvos':
      return (
        <AppleIcon
          className={mergeClasses(
            'opacity-80 icon-xs text-palette-blue12',
            platform === 'macos' && 'text-palette-purple12',
            platform === 'tvos' && 'text-palette-pink12'
          )}
        />
      );
    case 'android':
      return <AndroidIcon className="opacity-80 icon-xs text-palette-green12" />;
    case 'web':
      return <AtSignIcon className="opacity-80 icon-xs text-palette-orange12" />;
    case 'nxenv':
      return <NxenvGoLogo className="opacity-80 icon-xs text-palette-purple12" />;
    default:
      return null;
  }
};
