import { arbitrumSepolia, bscTestnet, lineaTestnet, polygonMumbai } from 'wagmi/chains';

import baseChains from './base-chains';

enum EChainsName {
  arbitrum = 'Arbitrum Sepolia',
  bsc = 'BSC Testnet',
  linea = 'Linea Goerli',
  polygon = 'Polygon Mumbai'
}

const testnetChainsConfig = {
  Linea: {
    ...baseChains.Linea,
    name: EChainsName.linea,
    network: lineaTestnet,
    gasEstimatorAddress: '0xF69da68Ee5Cf7fB5c9e99C116f880bb15700C68e' as `0x${string}`,
    contractAddress: '0x678690c9D8E4E7Ec21fa0681746002e069C4DF95' as `0x${string}`
  },
  Arbitrum: {
    ...baseChains.Arbitrum,
    name: EChainsName.arbitrum,
    network: arbitrumSepolia,
    gasEstimatorAddress: '0xD8Ea779b8FFC1096CA422D40588C4c0641709890' as `0x${string}`,
    contractAddress: '0xF4BF3C20Fe52dA6Ff8540B913aAa00e98FbF2f53' as `0x${string}`
  },
  BSC: {
    ...baseChains.BSC,
    name: EChainsName.bsc,
    network: bscTestnet,
    gasEstimatorAddress: '0x745bCE0D540AbE9cB639b6eACb5f6Ded3Cf947C9' as `0x${string}`,
    contractAddress: '0x23DCB7ccceFEEd877f263c8467E3cEa87C67e4Ca' as `0x${string}`
  },
  Polygon: {
    ...baseChains.Polygon,
    name: EChainsName.polygon,
    network: polygonMumbai,
    gasEstimatorAddress: '0x907f2e1F4A477319A700fC9a28374BA47527050e' as `0x${string}`,
    contractAddress: '0xD3e05232E1BF7bBa7d2a8Dd6f6b3bADCE6b11D14' as `0x${string}`
  }
};

const chains = Object.values(testnetChainsConfig);

export { EChainsName, chains };
