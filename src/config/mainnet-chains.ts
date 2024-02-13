import { arbitrum, bsc, linea, polygon } from 'wagmi/chains';

import baseChains from './base-chains';

enum EChainsName {
  arbitrum = 'Arbitrum',
  bsc = 'BSC',
  linea = 'Linea',
  polygon = 'Polygon'
}

const mainnetChainsConfig = {
  Arbitrum: {
    ...baseChains.Arbitrum,
    name: EChainsName.arbitrum,
    network: arbitrum,
    gasEstimatorAddress: '0x1606b74131162a6EeaD68f0294d2967cf6166DdE' as `0x${string}`,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  BSC: {
    ...baseChains.BSC,
    name: EChainsName.bsc,
    network: bsc,
    gasEstimatorAddress: '0x1606b74131162a6EeaD68f0294d2967cf6166DdE' as `0x${string}`,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  Linea: {
    ...baseChains.Linea,
    name: EChainsName.linea,
    network: linea,
    gasEstimatorAddress: '0x1606b74131162a6EeaD68f0294d2967cf6166DdE' as `0x${string}`,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  Polygon: {
    ...baseChains.Polygon,
    name: EChainsName.polygon,
    network: polygon,
    gasEstimatorAddress: '0x1606b74131162a6EeaD68f0294d2967cf6166DdE' as `0x${string}`,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  }
};

const mainnetChains = Object.values(mainnetChainsConfig);

export { EChainsName, mainnetChains };
