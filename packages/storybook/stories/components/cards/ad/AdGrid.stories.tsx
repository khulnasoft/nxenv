import type { Meta, StoryObj } from '@storybook/react';
import { AdGrid } from '@nxenv/shared/src/components/cards/ad/AdGrid';

const meta: Meta<typeof AdGrid> = {
  title: 'Components/Cards/Ads/AdGrid',
  component: AdGrid,
  args: {
    ad: {
      description: 'Ad Description',
      image: 'https://via.placeholder.com/150',
      link: 'https://nxenv.khulnasoft.com',
      source: 'Carbon',
      company: 'Ad Company',
      referralLink: 'https://nxenv.khulnasoft.com',
    }
  }
};

export default meta;

type Story = StoryObj<typeof AdGrid>;

export const Default: Story = {
  render: (props) => <div className='grid grid-cols-3 gap-4'><AdGrid {...props} /><AdGrid {...props} /><AdGrid {...props} /></div>,
  name: 'AdGrid',
};
