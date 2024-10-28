import React, { ReactElement } from 'react';
import {
  Button,
  ButtonVariant,
} from '@nxenv/shared/src/components/buttons/Button';
import { ArrowIcon } from '@nxenv/shared/src/components/icons';
import { SimpleTooltip } from '@nxenv/shared/src/components/tooltips/SimpleTooltip';
import LogoIcon from '@nxenv/shared/src/svg/LogoIcon';
import classNames from 'classnames';
import { BaseTooltipContainerProps } from '@nxenv/shared/src/components/tooltips/BaseTooltipContainer';
import AlertPointer, {
  AlertPlacement,
} from '@nxenv/shared/src/components/alert/AlertPointer';
import { companionAlertMessage } from './common';

interface CompanionToggleProps {
  companionState: boolean;
  isAlertDisabled: boolean;
  onToggleCompanion: () => void;
  tooltipContainerProps?: Omit<
    BaseTooltipContainerProps,
    'placement' | 'children'
  >;
}

function CompanionToggle({
  companionState,
  isAlertDisabled,
  tooltipContainerProps,
  onToggleCompanion,
}: CompanionToggleProps): ReactElement {
  return (
    <AlertPointer
      offset={[-4]}
      className={{ message: 'bg-background-default' }}
      isAlertDisabled={isAlertDisabled}
      placement={AlertPlacement.Left}
      message={companionAlertMessage}
    >
      <SimpleTooltip
        placement="left"
        content={companionState ? 'Close summary' : 'Open summary'}
        appendTo="parent"
        container={tooltipContainerProps}
      >
        <Button
          variant={
            companionState ? ButtonVariant.Secondary : ButtonVariant.Tertiary
          }
          className={classNames({
            'group-hover:btn-secondary': !companionState,
          })}
          icon={
            <>
              <LogoIcon
                className={{
                  container: classNames(
                    'w-6',
                    companionState ? 'hidden' : 'group-hover:hidden',
                  ),
                }}
              />
              <ArrowIcon
                className={classNames(
                  'icon ',
                  companionState
                    ? 'block rotate-90'
                    : 'hidden -rotate-90 group-hover:block',
                )}
              />
            </>
          }
          onClick={onToggleCompanion}
        />
      </SimpleTooltip>
    </AlertPointer>
  );
}

export default CompanionToggle;
