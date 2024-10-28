import { TriggerEvent } from '@deepsquads/react-contexify';
import { ContextMenuParams } from '@deepsquads/react-contexify/dist/types';
import useContextMenu from './useContextMenu';
import { ContextMenu } from './constants';

export default function useReportPostMenu(
  id: string = ContextMenu.PostContext,
): {
  showReportMenu: (
    event: TriggerEvent,
    params?: Pick<ContextMenuParams, 'id' | 'props' | 'position'> | undefined,
  ) => void;
} {
  const { onMenuClick } = useContextMenu({ id });

  return {
    showReportMenu: onMenuClick,
  };
}
