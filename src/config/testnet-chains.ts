import { arbitrumSepolia, bscTestnet, lineaTestnet, polygonMumbai } from 'wagmi/chains';

import baseChains from './base-chains';

enum EChainsName {
  arbitrum = 'Arbitrum Sepolia',
  bsc = 'BSC Testnet',
  linea = 'Linea Goerli',
  polygon = 'Polygon Mumbai'
}

const testnetChainsConfig = {
  Arbitrum: {
    ...baseChains.Arbitrum,
    name: EChainsName.arbitrum,
    network: arbitrumSepolia,
    gasEstimatorAddress: '0x5B3B2c5dfCAfeB4bf46Cfc3141e36E793f4C6fcd' as `0x${string}`,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  BSC: {
    ...baseChains.BSC,
    name: EChainsName.bsc,
    network: bscTestnet,
    gasEstimatorAddress: '0x5B3B2c5dfCAfeB4bf46Cfc3141e36E793f4C6fcd' as `0x${string}`,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  Linea: {
    ...baseChains.Linea,
    name: EChainsName.linea,
    network: lineaTestnet,
    gasEstimatorAddress: '0x5B3B2c5dfCAfeB4bf46Cfc3141e36E793f4C6fcd' as `0x${string}`,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  Polygon: {
    ...baseChains.Polygon,
    name: EChainsName.polygon,
    network: polygonMumbai,
    gasEstimatorAddress: '0x5B3B2c5dfCAfeB4bf46Cfc3141e36E793f4C6fcd' as `0x${string}`,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  }
};

const testnetChains = Object.values(testnetChainsConfig);

export { EChainsName, testnetChains };
