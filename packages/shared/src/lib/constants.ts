declare const navigator: Navigator & { brave?: { isBrave: unknown } };

// All links are loaded via Rebrandly
export const faq = 'https://r.nxenv.khulnasoft.com/faqs';
export const feedback = 'https://r.nxenv.khulnasoft.com/feedback';
export const requestFeature = 'https://r.nxenv.khulnasoft.com/request-feature';
export const reportIssue = 'https://r.nxenv.khulnasoft.com/report-issue';
export const termsOfService = 'https://r.nxenv.khulnasoft.com/tos';
export const privacyPolicy = 'https://r.nxenv.khulnasoft.com/privacy-policy';
export const cookiePolicy = 'https://r.nxenv.khulnasoft.com/cookie-policy';
export const reputation = 'https://r.nxenv.khulnasoft.com/reputation';
export const ownershipGuide = 'https://r.nxenv.khulnasoft.com/claim';
export const contentGuidelines = 'https://r.nxenv.khulnasoft.com/content-guidelines';
export const communityLinksGuidelines = 'https://r.nxenv.khulnasoft.com/community-links';
export const tellMeWhy = 'https://r.nxenv.khulnasoft.com/tellmewhy';
export const companionExplainerVideo = 'https://r.nxenv.khulnasoft.com/companion-overview';
export const companionPermissionGrantedLink =
  'https://r.nxenv.khulnasoft.com/try-the-companion';
export const initialDataKey = 'initial';
export const install = 'https://r.nxenv.khulnasoft.com/install';
export const uninstall = 'https://r.nxenv.khulnasoft.com/uninstall';
export const weeklyGoal = 'https://r.nxenv.khulnasoft.com/weekly-goal';
export const sharingBookmarks = 'https://r.nxenv.khulnasoft.com/sharing-bookmarks';
export const devCard = 'https://r.nxenv.khulnasoft.com/devcard-github';
export const docs = 'https://r.nxenv.khulnasoft.com/docs';
export const markdownGuide = 'https://r.nxenv.khulnasoft.com/markdown-guide';
export const careers = 'https://r.nxenv.khulnasoft.com/careers';
export const firstNotificationLink = 'https://r.nxenv.khulnasoft.com/notifications';
export const reportSquadMember = 'https://r.nxenv.khulnasoft.com/report-squad-member';
export const squadFeedback = 'https://r.nxenv.khulnasoft.com/squad-feedback';
export const updateFirefoxExtensionLink = 'https://r.nxenv.khulnasoft.com/firefoxupdate';
export const downloadBrowserExtension = 'https://r.nxenv.khulnasoft.com/download';
export const referralToC = 'https://r.nxenv.khulnasoft.com/referral-toc';
export const twitter = 'https://r.nxenv.khulnasoft.com/twitter';
export const squadsPublicWaitlist = 'https://r.nxenv.khulnasoft.com/public-squad-waitlist';
export const squadsPublicSuggestion =
  'https://r.nxenv.khulnasoft.com/public-squad-suggestion';
export const squadsPublicGuide = 'https://r.nxenv.khulnasoft.com/public-squads-guide';
export const searchFeedback = 'https://r.nxenv.khulnasoft.com/search-feedback';
export const searchDocs = 'https://r.nxenv.khulnasoft.com/search-docs';
export const slackIntegration = 'https://r.nxenv.khulnasoft.com/slack';
export const statusPage = 'https://r.nxenv.khulnasoft.com/status';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTesting =
  process.env.NODE_ENV === 'test' || (!isDevelopment && !isProduction);
export const isGBDevMode = process.env.NEXT_PUBLIC_GB_DEV_MODE === 'true';

export const isBrave = (): boolean => {
  if (!window.Promise) {
    return false;
  }
  return typeof navigator.brave?.isBrave === 'function';
};
export const isChrome = (): boolean =>
  /Chrome/.test(globalThis?.navigator?.userAgent) &&
  /Google Inc/.test(globalThis?.navigator?.vendor);

export const webappUrl = process.env.NEXT_PUBLIC_WEBAPP_URL;
export const onboardingUrl = `${webappUrl}onboarding`;

export const authUrl =
  process.env.NEXT_PUBLIC_AUTH_URL || 'http://127.0.0.1:4433';
export const heimdallUrl = isDevelopment
  ? process.env.NEXT_PUBLIC_HEIMDALL_URL || 'http://127.0.0.1:3000'
  : authUrl;

export const bookmarkLoops = 'https://r.nxenv.khulnasoft.com/bookmarkloops';
export const migrateUserToStreaks = 'https://r.nxenv.khulnasoft.com/streaks';

export const squadCategoriesPaths = {
  'My Squads': '/squads/discover/my',
  discover: '/squads/discover',
  featured: '/squads/discover/featured',
};
