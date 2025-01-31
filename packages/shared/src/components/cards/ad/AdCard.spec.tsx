import React from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import ad from '../../../../__tests__/fixture/ad';
import { AdGrid } from './AdGrid';
import { AdCardProps } from './common/common';

const defaultProps: AdCardProps = {
  ad,
  onLinkClick: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

const renderComponent = (props: Partial<AdCardProps> = {}): RenderResult => {
  return render(<AdGrid {...defaultProps} {...props} />);
};

it('should call on click on component left click', async () => {
  renderComponent();
  const el = await screen.findByRole('link');
  el.click();
  await waitFor(() => expect(defaultProps.onLinkClick).toBeCalledWith(ad));
});

it('should call on click on component middle mouse up', async () => {
  renderComponent();
  const el = await screen.findByRole('link');
  el.dispatchEvent(new MouseEvent('auxclick', { bubbles: true, button: 1 }));
  await waitFor(() => expect(defaultProps.onLinkClick).toBeCalledWith(ad));
});

it('should show a single image by default', async () => {
  renderComponent();
  const img = await screen.findByAltText('Ad image');
  const background = screen.queryByAltText('Ad image background');
  expect(img).toBeInTheDocument();
  expect(background).not.toBeInTheDocument();
});

it('should show blurred image for carbon', async () => {
  renderComponent({ ad: { ...ad, source: 'Carbon' } });
  const img = await screen.findByAltText('Ad image');
  const background = screen.queryByAltText('Ad image background');
  expect(img).toHaveClass('absolute');
  expect(background).toBeInTheDocument();
});

it('should show promoted text by default', async () => {
  renderComponent();
  const el = await screen.findByText('Promoted');
  expect(el).toBeInTheDocument();
});

it('should show referral text when available', async () => {
  renderComponent({
    ad: { ...ad, referralLink: 'https://nxenv.khulnasoft.com/referral' },
  });
  const el = await screen.findByText('Promoted by Daily');
  expect(el).toHaveAttribute('href', 'https://nxenv.khulnasoft.com/referral');
});

it('should show pixel images', async () => {
  renderComponent({
    ad: { ...ad, pixel: ['https://nxenv.khulnasoft.com/pixel'] },
  });
  const el = await screen.findByTestId('pixel');
  expect(el).toHaveAttribute('src', 'https://nxenv.khulnasoft.com/pixel');
});
