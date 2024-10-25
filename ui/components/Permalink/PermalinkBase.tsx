import { mergeClasses } from '@nxenv/styleguide';
import { cloneElement, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  component: JSX.Element;
  className?: string;
}>;

nxenvrt function PermalinkBase({ component, children, className, ...rest }: Props) {
  return cloneElement(
    component,
    {
      className: mergeClasses(className, component.props.className),
      ...rest,
    },
    children
  );
}
