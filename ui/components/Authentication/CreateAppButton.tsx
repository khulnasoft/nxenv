import { Button } from '@nxenv/styleguide';
import { ArrowUpRightIcon } from '@nxenv/styleguide-icons/outline/ArrowUpRightIcon';

type CreateAppButtonProps = { href: string; name: string };

nxenvrt const CreateAppButton = ({ href, name }: CreateAppButtonProps) => (
  <Button
    className="flex w-fit justify-center max-medium:min-w-full"
    href={href}
    openInNewTab
    rightSlot={<ArrowUpRightIcon />}>
    Create {name} App
  </Button>
);
