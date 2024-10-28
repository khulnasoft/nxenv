import { fn } from '@storybook/test';
import * as actual from '@nxenv/shared/src/components/GrowthBookProvider';

export const useFeature = fn(actual.useFeature)
  .mockName('useFeature')
  .mockReturnValue('control');

export * from '@nxenv/shared/src/components/GrowthBookProvider';
