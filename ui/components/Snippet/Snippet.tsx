import { mergeClasses } from '@nxenv/styleguide';
import type { HTMLAttributes } from 'react';

type SnippetProps = HTMLAttributes<HTMLDivElement>;

nxenvrt const Snippet = ({ children, className, ...rest }: SnippetProps) => (
  <div className={mergeClasses('flex flex-col mb-4 last:mb-0', className)} {...rest}>
    {children}
  </div>
);
