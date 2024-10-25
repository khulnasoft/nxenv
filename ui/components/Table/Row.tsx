import { mergeClasses } from '@nxenv/styleguide';
import { PropsWithChildren } from 'react';

type RowProps = PropsWithChildren<{
  subtle?: boolean;
}>;

nxenvrt const Row = ({ children, subtle }: RowProps) => (
  <tr
    className={mergeClasses(
      'even:bg-subtle',
      'even:[&_summary]:bg-element',
      subtle && 'opacity-50'
    )}>
    {children}
  </tr>
);
