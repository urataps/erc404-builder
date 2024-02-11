import { lineaTestnet, sepolia } from 'wagmi/chains';

import baseChains from './base-chains';

const testnetChainsConfig = {
  Ethereum: {
    ...baseChains.Ethereum,
    network: sepolia,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as const
  },
  Linea: {
    ...baseChains.Linea,
    network: lineaTestnet,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as const
  }
};

const testnetChains = Object.values(testnetChainsConfig);

export default testnetChains;
