import { theme, typography } from '@nxenv/styleguide';
import { HTMLAttributes } from 'react';

nxenvrt enum TextElement {
  CODE = 'code',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  LI = 'li',
  P = 'p',
  SPAN = 'span',
  UL = 'ul',
  OL = 'ol',
  PRE = 'pre',
  STRONG = 'strong',
  KBD = 'kbd',
  DEL = 'del',
}

nxenvrt type TextWeight = keyof typeof typography.utility.weight;
nxenvrt type TextTheme = keyof typeof theme.text;

nxenvrt type TextComponentProps = HTMLAttributes<
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLLIElement
  | HTMLUListElement
  | HTMLPreElement
  | HTMLModElement
> & {
  testID?: string;
  weight?: TextWeight;
  theme?: TextTheme;
  tag?: `${TextElement}`;
  crawlable?: boolean;
};
