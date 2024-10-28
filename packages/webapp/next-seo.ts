import { Source } from '@nxenv/shared/src/graphql/sources';
import { cloudinarySquadsImageFallback } from '@nxenv/shared/src/lib/image';
import { DefaultSeoProps, NextSeoProps, OpenGraph } from 'next-seo/lib/types';

const config: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    site_name: 'nxenv.khulnasoft.com',
  },
  twitter: {
    site: '@nxenv',
    cardType: 'summary_large_image',
  },
};

export default config;

export const defaultSeo: Partial<NextSeoProps> = {
  description:
    'nxenv.khulnasoft.com is the easiest way to stay updated on the latest programming news. Get the best content from the top tech publications on any topic you want.',
};

export const defaultOpenGraph: Partial<OpenGraph> = {
  images: [
    {
      url: 'https://res.cloudinary.com/daily-now/image/upload/s--VAY5ToZt--/f_auto/v1724209435/public/nxenv.khulnasoft.com%20-%20open%20graph',
    },
  ],
};

export const getSquadOpenGraph = ({
  squad,
}: {
  squad?: Pick<Source, 'image'>;
}): Partial<OpenGraph> => ({
  images:
    squad?.image && squad.image !== cloudinarySquadsImageFallback
      ? [{ url: squad.image }]
      : defaultOpenGraph.images,
});

export const defaultSeoTitle = 'nxenv.khulnasoft.com | Where developers grow together';
