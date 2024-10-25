import { mergeClasses } from '@nxenv/styleguide';

type IconProps = {
  title: string;
  image?: string;
  className?: string;
  size?: number;
};

nxenvrt const Icon = ({ title, image, className }: IconProps) => (
  <img
    className={mergeClasses('rounded-full p-1 bg-element size-16', className)}
    alt={title}
    src={image}
  />
);
