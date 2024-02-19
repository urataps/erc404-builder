import { arbitrum, bsc, linea, polygon } from 'wagmi/chains';

import baseChains from './base-chains';

enum EChainsName {
  arbitrum = 'Arbitrum',
  bsc = 'BSC',
  linea = 'Linea',
  polygon = 'Polygon'
}

const mainnetChainsConfig = {
  Linea: {
    ...baseChains.Linea,
    name: EChainsName.linea,
    network: linea,
    gasEstimatorAddress: '0xd3d7DBe73BbdD5A5C7a49Ca322763c4d400fC240' as `0x${string}`,
    contractAddress: '0x6bdc4c9FC3AE70c118550Dba6acd36d86C70298E' as `0x${string}`
  },
  Arbitrum: {
    ...baseChains.Arbitrum,
    name: EChainsName.arbitrum,
    network: arbitrum,
    gasEstimatorAddress: '0xF977814e90dA44bFA03b6295A0616a897441aceC' as `0x${string}`,
    contractAddress: '0x6bdc4c9FC3AE70c118550Dba6acd36d86C70298E' as `0x${string}`
  },
  BSC: {
    ...baseChains.BSC,
    name: EChainsName.bsc,
    network: bsc,
    gasEstimatorAddress: '0xF977814e90dA44bFA03b6295A0616a897441aceC' as `0x${string}`,
    contractAddress: '0x6bdc4c9FC3AE70c118550Dba6acd36d86C70298E' as `0x${string}`
  },
  Polygon: {
    ...baseChains.Polygon,
    name: EChainsName.polygon,
    network: polygon,
    gasEstimatorAddress: '0xF977814e90dA44bFA03b6295A0616a897441aceC' as `0x${string}`,
    contractAddress: '0x6bdc4c9FC3AE70c118550Dba6acd36d86C70298E' as `0x${string}`
  }
};

const chains = Object.values(mainnetChainsConfig);

export { EChainsName, chains };
