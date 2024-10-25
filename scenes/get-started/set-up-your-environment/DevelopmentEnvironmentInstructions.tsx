import { useRouter } from 'next/router';
import React from 'react';

import AndroidPhysicalDevelopmentBuild from './instructions/androidPhysicalDevelopmentBuild.mdx';
import AndroidPhysicalDevelopmentBuildLocal from './instructions/androidPhysicalDevelopmentBuildLocal.mdx';
import AndroidPhysicalNxenvGo from './instructions/androidPhysicalNxenvGo.mdx';
import AndroidSimulatedDevelopmentBuild from './instructions/androidSimulatedDevelopmentBuild.mdx';
import AndroidSimulatedDevelopmentBuildLocal from './instructions/androidSimulatedDevelopmentBuildLocal.mdx';
import AndroidSimulatedNxenvGo from './instructions/androidSimulatedNxenvGo.mdx';
import IosPhysicalDevelopmentBuild from './instructions/iosPhysicalDevelopmentBuild.mdx';
import IosPhysicalDevelopmentBuildLocal from './instructions/iosPhysicalDevelopmentBuildLocal.mdx';
import IosPhysicalNxenvGo from './instructions/iosPhysicalNxenvGo.mdx';
import IosSimulatedDevelopmentBuild from './instructions/iosSimulatedDevelopmentBuild.mdx';
import IosSimulatedDevelopmentBuildLocal from './instructions/iosSimulatedDevelopmentBuildLocal.mdx';
import IosSimulatedNxenvGo from './instructions/iosSimulatedNxenvGo.mdx';

nxenvrt function DevelopmentEnvironmentInstructions() {
  const router = useRouter();
  const { query: _query } = router;

  const query = {
    platform: 'android',
    device: 'physical',
    mode: 'nxenv-go',
    buildEnv: null,
    ..._query,
  };

  if (
    query.platform === 'android' &&
    query.device === 'physical' &&
    query.mode === 'development-build'
  ) {
    if (query.buildEnv === 'local') {
      return <AndroidPhysicalDevelopmentBuildLocal />;
    }

    return <AndroidPhysicalDevelopmentBuild />;
  }

  if (query.platform === 'android' && query.device === 'physical' && query.mode === 'nxenv-go') {
    return <AndroidPhysicalNxenvGo />;
  }

  if (
    query.platform === 'android' &&
    query.device === 'simulated' &&
    query.mode === 'development-build'
  ) {
    if (query.buildEnv === 'local') {
      return <AndroidSimulatedDevelopmentBuildLocal />;
    }

    return <AndroidSimulatedDevelopmentBuild />;
  }

  if (query.platform === 'android' && query.device === 'simulated' && query.mode === 'nxenv-go') {
    return <AndroidSimulatedNxenvGo />;
  }

  if (
    query.platform === 'ios' &&
    query.device === 'physical' &&
    query.mode === 'development-build'
  ) {
    if (query.buildEnv === 'local') {
      return <IosPhysicalDevelopmentBuildLocal />;
    }

    return <IosPhysicalDevelopmentBuild />;
  }

  if (
    query.platform === 'ios' &&
    query.device === 'simulated' &&
    query.mode === 'development-build'
  ) {
    if (query.buildEnv === 'local') {
      return <IosSimulatedDevelopmentBuildLocal />;
    }

    return <IosSimulatedDevelopmentBuild />;
  }

  if (query.platform === 'ios' && query.device === 'physical' && query.mode === 'nxenv-go') {
    return <IosPhysicalNxenvGo />;
  }

  if (query.platform === 'ios' && query.device === 'simulated' && query.mode === 'nxenv-go') {
    return <IosSimulatedNxenvGo />;
  }
}
