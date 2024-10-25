import { Global } from '@emotion/react';
import { BlockingSetInitialColorMode } from '@nxenv/styleguide';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

import { globalDiff } from '~/global-styles/diff';
import { globalNProgress } from '~/global-styles/nprogress';
import { globalPrism } from '~/global-styles/prism';
import { globalTippy } from '~/global-styles/tippy';

nxenvrt default class DocsDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <Global styles={[globalNProgress, globalPrism, globalTippy, globalDiff]} />
        </Head>
        <body className="text-pretty">
          <BlockingSetInitialColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
