import { mergeClasses } from '@nxenv/styleguide';
import type { ElementType, HTMLAttributes } from 'react';

nxenvrt type DocIconProps = HTMLAttributes<SVGSVGElement> & {
  Icon?: ElementType;
  small?: boolean;
};

nxenvrt const IconBase = ({ className, small, Icon, ...rest }: DocIconProps) => {
  if (!Icon) return null;

  return (
    <Icon
      className={mergeClasses(
        'inline-block',
        small ? 'icon-sm' : 'icon-md',
        'text-icon-default',
        '[table_&]:align-middle [li_&]:align-middle [li_&]:-mt-0.5',
        className
      )}
      {...rest}
    />
  );
};
