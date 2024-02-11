import { linea, mainnet } from 'wagmi/chains';

import baseChains from './base-chains';

const mainnetChainsConfig = {
  Ethereum: {
    ...baseChains.Ethereum,
    network: mainnet
  },
  Linea: {
    ...baseChains.Linea,
    network: linea
  }
};

const mainnetChains = Object.values(mainnetChainsConfig);

export default mainnetChains;
