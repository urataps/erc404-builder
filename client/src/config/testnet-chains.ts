import type { Address } from 'viem';

import { bscTestnet, opBNBTestnet } from 'wagmi/chains';

import baseChains from './base-chains';

enum EChainsName {
  bsc = 'BSC Testnet',
  opBNB = 'opBNB Testnet'
}

const testnetChainsConfig = {
  BSC: {
    ...baseChains.BSC,
    name: EChainsName.bsc,
    network: bscTestnet,
    gasEstimatorAddress: '0x745bCE0D540AbE9cB639b6eACb5f6Ded3Cf947C9' as Address,
    contractAddress: '0x23DCB7ccceFEEd877f263c8467E3cEa87C67e4Ca' as Address
  },
  opBNB: {
    ...baseChains.opBNB,
    name: EChainsName.opBNB,
    network: opBNBTestnet,
    gasEstimatorAddress: '0x13E58f68217c0829E6a51633d12CF2924bC72a99' as Address,
    contractAddress: '0xb747e0671BF4531a01a9640C4Ad56805cD916e61' as Address
  }
};

const chains = Object.values(testnetChainsConfig);

export { EChainsName, chains };
