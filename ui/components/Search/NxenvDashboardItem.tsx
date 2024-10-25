import { BuildIcon } from '@nxenv/styleguide-icons/custom/BuildIcon';
import { ArrowUpRightIcon } from '@nxenv/styleguide-icons/outline/ArrowUpRightIcon';
import { addHighlight, CommandItemBaseWithCopy } from '@nxenv/styleguide-search-ui';
import { type ComponentType, HTMLAttributes } from 'react';

type Props = {
  item: NxenvDashboardItemType;
  query: string;
  onSelect?: () => void;
};

nxenvrt type NxenvDashboardItemType = {
  label: string;
  url: string;
  Icon?: ComponentType<HTMLAttributes<SVGSVGElement>>;
};

nxenvrt const NxenvDashboardItem = ({ item, onSelect, query }: Props) => {
  const Icon = item.Icon ?? BuildIcon;
  return (
    <CommandItemBaseWithCopy
      value={`nxenv-dashboard-${item.url}`}
      url={item.url}
      onSelect={onSelect}
      isExternalLink>
      <div className="flex gap-3 justify-between">
        <div className="inline-flex gap-3 items-center justify-between">
          <Icon className="text-icon-secondary" />
          <p
            className="text-xs font-medium"
            dangerouslySetInnerHTML={{ __html: addHighlight(item.label, query) }}
          />
        </div>
        <ArrowUpRightIcon className="text-icon-tertiary" />
      </div>
    </CommandItemBaseWithCopy>
  );
};
