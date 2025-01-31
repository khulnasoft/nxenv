import { postWindowMessage } from '@nxenv/shared/src/lib/func';
import { AuthEvent } from '@nxenv/shared/src/lib/kratos';
import { ReactElement, useEffect } from 'react';

function ErrorPage(): ReactElement {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    postWindowMessage(AuthEvent.Error, params);
    window.close();
  }, []);

  return null;
}

export default ErrorPage;
