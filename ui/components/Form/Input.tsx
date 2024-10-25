import { mergeClasses } from '@nxenv/styleguide';
import { type InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

nxenvrt function Input({ className, ...rest }: Props) {
  return (
    <input
      className={mergeClasses(
        'block shadow-xs border border-default rounded-md text-default bg-default h-12 w-full my-2.5 px-4 placeholder:text-icon-quaternary',
        className
      )}
      {...rest}
    />
  );
}
