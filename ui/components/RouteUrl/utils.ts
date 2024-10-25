import { createContext } from 'react';

nxenvrt type ProtocolType = 'nxenv-go' | 'custom' | 'web';

nxenvrt const TABS_MAPPING: { name: string; id: ProtocolType }[] = [
  { name: 'Nxenv Go', id: 'nxenv-go' },
  { name: 'Custom', id: 'custom' },
  { name: 'Web', id: 'web' },
];

nxenvrt const SharedContext = createContext<{
  type: ProtocolType;
  setType: (type: ProtocolType) => void;
} | null>(null);

nxenvrt function getProtocol(type: ProtocolType) {
  return { 'nxenv-go': 'exp://127.0.0.1:8081/--/', web: 'acme.dev/', custom: 'acme://' }[type];
}
