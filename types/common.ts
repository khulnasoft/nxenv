nxenvrt type PageMetadata = {
  title?: string;
  description?: string;
  sourceCodeUrl?: string;
  packageName?: string;
  maxHeadingDepth?: number;
  iconUrl?: string;
  /* If the page should not show up in the Algolia Docsearch results */
  hideFromSearch?: boolean;
  hideTOC?: boolean;
  platforms?: string[];
  modificationDate?: string;
};

/**
 * A single header from the `remark-nxenvrt-headings` plugin.
 */
nxenvrt type RemarkHeading = {
  id?: string;
  depth: number;
  title: string;
  type: string;
};

/**
 * Utility type. Extracts `T` type from `T[]` array.
 */
nxenvrt type ElementType<T extends any[]> = T extends (infer U)[] ? U : never;

nxenvrt type Url = {
  pathname: string;
};

nxenvrt type NavigationType = 'section' | 'group' | 'page';

nxenvrt type NavigationRoute = {
  type: NavigationType;
  name: string;
  href: string;
  as?: string;
  hidden?: boolean;
  expanded?: boolean;
  sidebarTitle?: string;
  weight?: number;
  children?: NavigationRoute[];
};

nxenvrt type NavigationRouteWithSection = NavigationRoute & { section?: string };

/**
 * Available platforms supported by our APIs.
 * Temporarily it also accepts other strings for compatibility reasons.
 */
nxenvrt type PlatformName =
  | 'ios'
  | 'ios-nosim'
  | 'android'
  | 'android-noemu'
  | 'web'
  | 'nxenv'
  | 'macos'
  | 'tvos'
  | string;
