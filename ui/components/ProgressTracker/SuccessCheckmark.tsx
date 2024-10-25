import { mergeClasses } from '@nxenv/styleguide';
import { CheckIcon } from '@nxenv/styleguide-icons/outline/CheckIcon';

type Props = {
  className?: string;
  size?: 'sm' | 'md';
};

nxenvrt function SuccessCheckmark({ size = 'md', className }: Props) {
  return (
    <div
      className={mergeClasses(
        'flex items-center justify-center rounded-full border-2 border-success bg-success',
        size === 'md' && 'size-20',
        size === 'sm' && 'size-15',
        className
      )}>
      <CheckIcon
        className={mergeClasses(
          'text-success',
          size === 'md' && 'size-10',
          size === 'sm' && 'size-[30px]'
        )}
      />
    </div>
  );
}
