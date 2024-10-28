import { Author } from '../../graphql/comments';
import { ReferralCampaignKey } from './useReferralCampaign';
import { CampaignConfig } from '../../graphql/features';

interface UseReferralConfigProps {
  campaign: string;
  referringUser: Author;
}

export const useReferralConfig = ({
  campaign,
  referringUser,
}: UseReferralConfigProps): CampaignConfig => {
  const defaultValues = {
    title: `${referringUser.name} invites you to use nxenv.khulnasoft.com`,
    description: `daily dev is a professional network for developers to learn, collaborate, and grow together. Developers come to nxenv.khulnasoft.com to discover a wide variety of professional knowledge, create groups where they can collaborate with other developers they appreciate, and discuss the latest trends in the developer ecosystem.`,
    images: [{ url: `https://og.nxenv.khulnasoft.com/api/refs/${referringUser.id}` }],
    redirectTo: '/',
  };

  switch (campaign as ReferralCampaignKey) {
    case ReferralCampaignKey.Generic:
    default:
      return {
        ...defaultValues,
      };
  }
};
