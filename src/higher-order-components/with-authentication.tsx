/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import React, { useEffect, useMemo, useState } from 'react';

import type { PropsWithChildren } from 'react';
import type { WalletClient } from 'viem';

import { redirect, usePathname } from 'next/navigation';
import { createWalletClient, custom, verifyMessage } from 'viem';
import { useAccount, useAccountEffect, useChainId, useDisconnect } from 'wagmi';

import { useToast } from '@/components/ui/toast/use-toast';
import { testnetChains } from '@/config/testnet-chains';
import { ERoutesPath, routes } from '@/constants/routes';

type TWithAuthentication = PropsWithChildren;

export default function WithAuthentication({ children }: TWithAuthentication) {
  const chainId = useChainId();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const activeChain = useMemo(() => {
    const chain = testnetChains.find((chain) => chain.network.id === chainId);
    return chain ?? testnetChains[0];
  }, [chainId]);

  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);

  const { toast } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    if (window.ethereum) {
      const walletClient = createWalletClient({
        chain: activeChain?.network,
        transport: custom(window.ethereum)
      });

      setWalletClient(walletClient);
    }
  }, [activeChain]);

  useEffect(() => {
    if (!isConnected) {
      for (const route of routes) {
        if (route.isAuthed && pathname === route.path.toString()) {
          redirect(ERoutesPath.home);
        }
      }
    }
  }, [isConnected, pathname]);

  useAccountEffect({
    onConnect: async ({ address }) => {
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
      } catch (error: unknown) {
        disconnect();

        toast({
          variant: 'destructive',
          title: 'Transaction error',
          description: 'You must accept Terms and Conditions before using our platform.'
        });

        console.error('ERROR SIGNIN TAC', error);
      }
    }
  });

  return <>{children}</>;
}

function generateTACMessage(address: string) {
  return `
Welcome to DeFi Builder!
  
Click to sign in and accept DeFi Builder Terms and Conditions (https://defibuilder.comterms-and-conditions) and Privacy Policy (https://defibuilder.com/privacy-policy/).
  
This request will not trigger a blockchain transaction or cost any gas fees.
  
Wallet address:
${address}
`;
}