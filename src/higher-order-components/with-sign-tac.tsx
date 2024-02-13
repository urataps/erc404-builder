/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import React, { useEffect, useMemo, useState } from 'react';

import type { PropsWithChildren } from 'react';
import type { WalletClient } from 'viem';

import { createWalletClient, custom, verifyMessage } from 'viem';
import { useAccountEffect, useChainId, useDisconnect } from 'wagmi';

import { useToast } from '@/components/ui/toast/use-toast';
import { testnetChains } from '@/config/testnet-chains';

type TWithSignTAC = PropsWithChildren;

// TAC = Terms and Conditions
export default function WithSignTAC({ children }: TWithSignTAC) {
  const chainId = useChainId();
  const { disconnect } = useDisconnect();

  const activeChain = useMemo(() => {
    const chain = testnetChains.find((chain) => chain.network.id === chainId);
    return chain ?? testnetChains[0];
  }, [chainId]);

  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (window.ethereum && activeChain) {
      const walletClient = createWalletClient({
        chain: activeChain.network,
        transport: custom(window.ethereum)
      });

      setWalletClient(walletClient);
    }
  }, [activeChain]);

  useAccountEffect({
    onConnect: async ({ address, isReconnected }) => {
      if (!isReconnected) {
        const tacMessage = generateTACMessage(address);

        try {
          const signature = await walletClient?.signMessage({
            account: address,
            message: tacMessage
          });

          if (signature) {
            await verifyMessage({
              address,
              message: tacMessage,
              signature
            });
          }
        } catch (error) {
          disconnect();

          toast({
            variant: 'destructive',
            title: 'Error - Signature',
            description: 'You must accept Terms and Conditions before using our platform.'
          });

          console.error('ERROR SIGNIN TAC', error);
        }
      }
    }
  });

  return <>{children}</>;
}

function generateTACMessage(address: string) {
  return `
Welcome to DeFi Builder!
  
Click to sign in and accept DeFi Builder Terms and Conditions (https://defibuilder.com/terms-and-conditions) and Privacy Policy (https://defibuilder.com/privacy-policy/).
  
This request will not trigger a blockchain transaction or cost any gas fees.
  
Wallet address:
${address}
`;
}
