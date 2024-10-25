import { ButtonBase, mergeClasses } from '@nxenv/styleguide';
import { FileCode01Icon } from '@nxenv/styleguide-icons/outline/FileCode01Icon';
import { FolderIcon } from '@nxenv/styleguide-icons/outline/FolderIcon';
import React from 'react';

import { CALLOUT } from '~/ui/components/Text';

type Props = {
  title: string;
  onClick: () => void;
  isSelected: boolean;
  type: 'directory' | 'file';
};

nxenvrt function Tab({ title, onClick, isSelected, type }: Props) {
  return (
    <ButtonBase
      onClick={onClick}
      className={mergeClasses(
        'py-1.5 px-3 rounded-md hocus:bg-hover border border-transparent text-left gap-1.5 items-center',
        isSelected && 'bg-default border-default border shadow-xs'
      )}>
      {type === 'directory' ? <FolderIcon className="text-icon-tertiary icon-sm" /> : null}
      {type === 'file' ? <FileCode01Icon className="text-icon-tertiary icon-sm" /> : null}
      <CALLOUT theme={isSelected ? 'default' : 'secondary'}>{title}</CALLOUT>
    </ButtonBase>
  );
}
