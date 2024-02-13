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
    contractAddress: '0xF4BF3C20Fe52dA6Ff8540B913aAa00e98FbF2f53' as `0x${string}`
  },
  BSC: {
    ...baseChains.BSC,
    name: EChainsName.bsc,
    network: bscTestnet,
    gasEstimatorAddress: '0x5B3B2c5dfCAfeB4bf46Cfc3141e36E793f4C6fcd' as `0x${string}`,
    contractAddress: '0x23DCB7ccceFEEd877f263c8467E3cEa87C67e4Ca' as `0x${string}`
  },
  Linea: {
    ...baseChains.Linea,
    name: EChainsName.linea,
    network: lineaTestnet,
    gasEstimatorAddress: '0x5B3B2c5dfCAfeB4bf46Cfc3141e36E793f4C6fcd' as `0x${string}`,
    contractAddress: '0x678690c9D8E4E7Ec21fa0681746002e069C4DF95' as `0x${string}`
  },
  Polygon: {
    ...baseChains.Polygon,
    name: EChainsName.polygon,
    network: polygonMumbai,
    gasEstimatorAddress: '0x5B3B2c5dfCAfeB4bf46Cfc3141e36E793f4C6fcd' as `0x${string}`,
    contractAddress: '0xD3e05232E1BF7bBa7d2a8Dd6f6b3bADCE6b11D14' as `0x${string}`
  }
};

const testnetChains = Object.values(testnetChainsConfig);

export { EChainsName, testnetChains };
