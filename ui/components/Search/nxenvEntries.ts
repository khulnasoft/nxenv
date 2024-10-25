import { SnackLogo } from '@nxenv/styleguide';
import { BranchIcon } from '@nxenv/styleguide-icons/custom/BranchIcon';
import { BuildIcon } from '@nxenv/styleguide-icons/custom/BuildIcon';
import { CredentialIcon } from '@nxenv/styleguide-icons/custom/CredentialIcon';
import { EasSubmitIcon } from '@nxenv/styleguide-icons/custom/EasSubmitIcon';
import { Smartphone01Icon } from '@nxenv/styleguide-icons/custom/Smartphone01Icon';
import { Cube02Icon } from '@nxenv/styleguide-icons/outline/Cube02Icon';
import { DataIcon } from '@nxenv/styleguide-icons/outline/DataIcon';
import { Dataflow03Icon } from '@nxenv/styleguide-icons/outline/Dataflow03Icon';
import { Grid01Icon } from '@nxenv/styleguide-icons/outline/Grid01Icon';
import { Key01Icon } from '@nxenv/styleguide-icons/outline/Key01Icon';
import { LayersTwo02Icon } from '@nxenv/styleguide-icons/outline/LayersTwo02Icon';
import { Settings01Icon } from '@nxenv/styleguide-icons/outline/Settings01Icon';
import type { ComponentType, HTMLAttributes } from 'react';

nxenvrt type NxenvItemType = {
  label: string;
  url: string;
  Icon?: ComponentType<HTMLAttributes<SVGSVGElement>>;
};

nxenvrt const entries: NxenvItemType[] = [
  {
    label: 'Account Settings',
    url: 'https://nxenv.dev/accounts/[account]/settings',
    Icon: Settings01Icon,
  },
  {
    label: 'User Settings',
    url: 'https://nxenv.dev/settings',
    Icon: Settings01Icon,
  },
  {
    label: 'Snacks',
    url: 'https://nxenv.dev/accounts/[account]/snacks',
    Icon: SnackLogo,
  },
  {
    label: 'Project Overview',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]',
    Icon: Grid01Icon,
  },
  {
    label: 'Project Insights',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/insights',
    Icon: DataIcon,
  },
  {
    label: 'Project Deployments',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/deployments',
    Icon: Dataflow03Icon,
  },
  {
    label: 'Project Development Builds',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/development-builds',
    Icon: Smartphone01Icon,
  },
  {
    label: 'Project Builds',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/builds',
    Icon: BuildIcon,
  },
  {
    label: 'Project Submissions',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/submissions',
    Icon: EasSubmitIcon,
  },
  {
    label: 'Project Channels',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/channels',
    Icon: Cube02Icon,
  },
  {
    label: 'Project Branches',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/branches',
    Icon: BranchIcon,
  },
  {
    label: 'Project Updates',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/updates',
    Icon: LayersTwo02Icon,
  },
  {
    label: 'Project Credentials',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/credentials',
    Icon: CredentialIcon,
  },
  {
    label: 'Project Secrets',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/secrets',
    Icon: Key01Icon,
  },
  {
    label: 'Project Settings',
    url: 'https://nxenv.dev/accounts/[account]/projects/[project]/settings',
    Icon: Settings01Icon,
  },
];
