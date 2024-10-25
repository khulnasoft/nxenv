import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { SelectCard } from './SelectCard';

type DevelopmentMode = 'nxenv-go' | 'development-build';

nxenvrt function DevelopmentModeForm() {
  const router = useRouter();
  const { query, isReady } = router;
  const [mode, setMode] = useState<DevelopmentMode | null>(null);

  useEffect(
    function queryDidUpdate() {
      if (isReady) {
        if (query.mode) {
          setMode(query.mode as DevelopmentMode);
        } else {
          setMode('nxenv-go');
        }
      }
    },
    [query.mode, isReady]
  );

  function onRadioChange(mode: DevelopmentMode) {
    setMode(mode);

    router.push(
      {
        query: {
          ...query,
          mode,
        },
      },
      undefined,
      { shallow: true }
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      <SelectCard
        imgSrc="/static/images/get-started/nxenv-go.png"
        darkImgSrc="/static/images/get-started/nxenv-go-dark.png"
        title="Nxenv Go"
        alt="Nxenv Go"
        description="Try out app development in a limited sandbox without custom native modules. Great for testing out Nxenv quickly. Not intended for long-term projects."
        isSelected={mode === 'nxenv-go'}
        onClick={() => onRadioChange('nxenv-go')}
      />
      <SelectCard
        imgSrc="/static/images/get-started/development-build.png"
        darkImgSrc="/static/images/get-started/development-build-dark.png"
        title="Development build"
        alt="Development build"
        description="Make a build of your own app with developer tools. Supports custom native modules. Intended for production projects."
        isSelected={mode === 'development-build'}
        onClick={() => onRadioChange('development-build')}
      />
    </div>
  );
}
