import { arbitrum, bsc, linea, polygon } from 'wagmi/chains';

import baseChains from './base-chains';

const mainnetChainsConfig = {
  Arbitrum: {
    ...baseChains.Arbitrum,
    name: 'Arbitrum',
    network: arbitrum,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  BSC: {
    ...baseChains.BSC,
    name: 'BSC',
    network: bsc,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  Linea: {
    ...baseChains.Linea,
    name: 'Linea',
    network: linea,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  Polygon: {
    ...baseChains.Polygon,
    name: 'Polygon',
    network: polygon,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  }
};

const mainnetChains = Object.values(mainnetChainsConfig);

export default mainnetChains;
