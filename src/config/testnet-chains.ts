import { lineaTestnet, sepolia } from 'wagmi/chains';

import baseChains from './base-chains';

const testnetChainsConfig = {
  Ethereum: {
    ...baseChains.Ethereum,
    network: sepolia
  },
  Linea: {
    ...baseChains.Linea,
    network: lineaTestnet
  }
};

const testnetChains = Object.values(testnetChainsConfig);

export default testnetChains;
