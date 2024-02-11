import { arbitrumSepolia, bscTestnet, lineaTestnet, polygonMumbai } from 'wagmi/chains';

import baseChains from './base-chains';

const testnetChainsConfig = {
  Arbitrum: {
    ...baseChains.Arbitrum,
    name: 'Arbitrum Sepolia',
    network: arbitrumSepolia,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  BSC: {
    ...baseChains.BSC,
    name: 'BSC Testnet',
    network: bscTestnet,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  Linea: {
    ...baseChains.Linea,
    name: 'Linea Goerli',
    network: lineaTestnet,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  },
  Polygon: {
    ...baseChains.Polygon,
    name: 'Polygon Mumbai',
    network: polygonMumbai,
    contractAddress: '0x6a6Cd89725ff0D8cFB6A8f7E41B735A277331c2A' as `0x${string}`
  }
};

const testnetChains = Object.values(testnetChainsConfig);

export default testnetChains;
