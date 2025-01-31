import { fn } from '@storybook/test';

export const useConditionalFeature = fn()
  .mockName('useConditionalFeature')
  .mockReturnValue({ value: 'control', isLoading: false });

export * from '@nxenv/shared/src/hooks';
