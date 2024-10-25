import { css } from '@emotion/react';
import { typography } from '@nxenv/styleguide';
import { palette } from '@nxenv/styleguide-base';

nxenvrt const globalTippy = css`
  div.tippy-box {
    text-align: left;
    background: ${palette.black};
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .tippy-box svg {
    transform: rotate(180deg);
  }

  .tippy-box[data-theme~='nxenv'] .tippy-content {
    ${typography.body.paragraph};
    color: ${palette.dark.gray12};
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    background: ${palette.black};
    padding: 18px;
    margin-bottom: -10px;
    border-radius: 4px;
  }

  .tippy-content a {
    color: ${palette.dark.gray12};
  }
`;
