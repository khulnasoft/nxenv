import React, { ReactElement, useContext, useEffect, useRef } from 'react';
import Custom404 from '@nxenv/shared/src/components/Custom404';
import { NextSeo } from 'next-seo';
import { LogEvent } from '@nxenv/shared/src/lib/log';
import LogContext from '@nxenv/shared/src/contexts/LogContext';

export default function Custom404Seo(): ReactElement {
  const { logEvent } = useContext(LogContext);
  const logImpression = useRef(false);

  useEffect(() => {
    if (logImpression.current) {
      return;
    }

    logEvent({
      event_name: LogEvent.View404Page,
    });
    logImpression.current = true;
  }, [logEvent, logImpression]);

  return (
    <Custom404>
      <NextSeo title="Page not found" nofollow noindex />
    </Custom404>
  );
}
