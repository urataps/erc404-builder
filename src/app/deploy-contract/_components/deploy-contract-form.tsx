/* eslint-disable sonarjs/no-duplicate-string */

'use client';

import React, { useEffect, useMemo } from 'react';

import type { Abi } from 'viem';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { formatUnits } from 'viem';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { z } from 'zod';

import factoryAbi from '@/artifacts/Factory.json';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/toast/use-toast';
import { EChainsName, testnetChains } from '@/config/testnet-chains';
import useReadContract from '@/custom-hooks/use-read-contract';
import useWriteContract from '@/custom-hooks/use-write-contract';
import { mapWalletErrorsToMessage } from '@/lib/errors-mapper';
import { cn } from '@/lib/utils';

import Countdown from './countdown';
import GasFeeEstimation from './gas-fee-estimation';

const formSchema = z.object({
  tokenName: z
    .string({ required_error: 'is required' })
    .trim()
    .min(2, { message: 'must contain at least 2 characters' })
    .max(50, { message: 'must contain at most 50 characters' }),
  tokenSymbol: z
    .string({ required_error: 'is required' })
    .trim()
    .min(1, { message: 'must contain at least 1 character' })
    .max(10, { message: 'must contain at most 10 characters' })
    .refine((value) => value === value.toUpperCase(), {
      message: 'must contain only uppercase characters'
    }),
  baseUri: z
    .string({ required_error: 'is required' })
    .trim()
    .min(1, { message: 'must contain at least 1 character' })
    .refine((value) => value.endsWith('/'), {
      message: 'must end with forward slash'
    }),
  totalSupply: z
    .string({ required_error: 'is required' })
    .trim()
    .refine((value) => !Number.isNaN(Number(value)), { message: 'must be a number' })
    .refine((value) => Number(value) >= 1, { message: 'must be 1 or more' }),
  chain: z.enum([EChainsName.arbitrum, EChainsName.bsc, EChainsName.linea, EChainsName.polygon])
});

export default function DeployContractForm() {
  const chainId = useChainId();
  const activeChain = useMemo(
    () => testnetChains.find((chain) => chain.network.id === chainId) ?? testnetChains[0],
    [chainId]
  );
  const explorer = useMemo(() => activeChain?.network.blockExplorers.default, [activeChain]);

  const account = useAccount();
  const { toast } = useToast();
  const { isPending: isSwitchLoading, switchChainAsync } = useSwitchChain();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenName: '',
      tokenSymbol: '',
      totalSupply: '',
      baseUri: '',
      chain: EChainsName.arbitrum
    }
  });

  // prettier-ignore
  const { 
    isLoading: isDeploymentFeeLoading,
    response: deploymentFee,
    readContract: readDeploymentFee
  } = useReadContract<bigint>();

  // prettier-ignore
  const {
    isLoading: isDeployERC404Loading,
    errorMessage: deployERC404Error,
    response: deployERC404Response,
    writeContract: deployERC404
  } = useWriteContract();

  useEffect(() => {
    if (activeChain) {
      const activeChainName = activeChain.name as EChainsName;
      form.setValue('chain', activeChainName);
    }
  }, [activeChain, form]);

  useEffect(() => {
    if (activeChain && !isSwitchLoading) {
      // prettier-ignore
      readDeploymentFee(
        factoryAbi.abi as Abi,
        'deploymentFee',
        activeChain.contractAddress,
      );
    }
  }, [activeChain, readDeploymentFee]);

  useEffect(() => {
    if (deployERC404Error) {
      toast({
        variant: 'destructive',
        title: deployERC404Error.title,
        description: deployERC404Error.message
      });
    }
  }, [deployERC404Error, toast]);

  useEffect(() => {
    if (deployERC404Response) {
      const deploymentAddress = deployERC404Response.simulation.result as string;

      toast({
        title: 'Success',
        description: (
          <>
            <p>Collection deployed successfully.</p>
            {explorer ? (
              <Button variant='link' className='h-min px-0 py-0' asChild>
                <Link href={`${explorer.url}/address/${deploymentAddress}`} target='_blank'>
                  View the collection on {explorer.name}.
                </Link>
              </Button>
            ) : null}
            <span className='absolute bottom-0 left-0 h-2 w-full bg-green-400' />
          </>
        )
      });

      form.reset();
    }
  }, [deployERC404Response, explorer, form, toast]);

  async function handleRadioChange(value: EChainsName) {
    if (isDeployERC404Loading) {
      return;
    }

    const chain = testnetChains.find((chain) => chain.name === value);

    if (!chain) {
      return;
    }

    try {
      await switchChainAsync({
        chainId: chain.network.id
      });

      form.setValue('chain', value);
    } catch (error: unknown) {
      const walletError = mapWalletErrorsToMessage(error);

      toast({
        variant: 'destructive',
        title: walletError.title,
        description: walletError.message
      });

      console.error('ERROR SWITCHING CHAIN', error);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!deploymentFee) {
      return;
    }

    const name = values.tokenName;
    const symbol = values.tokenSymbol;
    const baseURI = values.baseUri;
    const totalNFTSupply = values.totalSupply;

    await deployERC404(
      factoryAbi.abi as Abi,
      'deployERC404',
      [name, symbol, baseURI, totalNFTSupply],
      activeChain?.contractAddress ?? '0x',
      deploymentFee
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='tokenName'
          disabled={isDeployERC404Loading}
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-1'>
                <FormLabel className='text-base font-semibold'>Token name</FormLabel>
                <FormMessage className='text-base font-semibold' />
              </div>
              <FormControl>
                <Input placeholder='i.e. DeFi Builder' className='placeholder:italic' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tokenSymbol'
          disabled={isDeployERC404Loading}
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-1'>
                <FormLabel className='text-base font-semibold'>Token symbol</FormLabel>
                <FormMessage className='text-base font-semibold' />
              </div>
              <FormControl>
                <Input placeholder='i.e. DFB' className='placeholder:italic' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='totalSupply'
          disabled={isDeployERC404Loading}
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-1'>
                <FormLabel className='text-base font-semibold'>Total supply</FormLabel>
                <FormMessage className='text-base font-semibold' />
              </div>
              <FormControl>
                <Input placeholder='i.e. 1000' className='placeholder:italic' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='baseUri'
          disabled={isDeployERC404Loading}
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-1'>
                <FormLabel className='text-base font-semibold'>Base URI</FormLabel>
                <FormMessage className='text-base font-semibold' />
              </div>
              <FormControl>
                <Input
                  placeholder='i.e. ipfs://QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB/'
                  className='placeholder:italic'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='chain'
          render={({ field }) => (
            <FormItem className='overflow-x-auto pb-5'>
              <FormLabel className='text-base font-semibold'>Blockchain</FormLabel>
              <FormControl className='flex gap-x-5'>
                <RadioGroup defaultValue={EChainsName.arbitrum} onValueChange={field.onChange}>
                  {testnetChains.map((chain) => (
                    <FormItem
                      key={chain.name}
                      className={cn(
                        'flex w-52 shrink-0 cursor-pointer items-center rounded-md border border-border p-2.5 transition-colors',
                        {
                          'border-primary': form.getValues('chain') === (chain.name as EChainsName),
                          'hover:border-primary/75':
                            !isDeployERC404Loading &&
                            form.getValues('chain') !== (chain.name as EChainsName)
                        }
                      )}
                      onClick={async () => await handleRadioChange(chain.name as EChainsName)}
                    >
                      <FormControl>
                        <RadioGroupItem value={chain.name} className='sr-only' />
                      </FormControl>

                      <div className='flex flex-col gap-y-2.5'>
                        <div className='flex items-center gap-x-5'>
                          <Image
                            src={chain.logo}
                            alt={`${chain.name}'s logo`}
                            width={30}
                            height={30}
                            className='rounded-full'
                          />
                          <FormLabel className='cursor-pointer text-base font-medium'>
                            {chain.name}
                          </FormLabel>
                        </div>

                        <Badge variant='secondary' className='w-fit'>
                          {chain.badge}
                        </Badge>

                        <GasFeeEstimation chainName={chain.name} deploymentFee={deploymentFee} />
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <div className='relative mt-5 flex items-center justify-between rounded-md border-2 border-destructive p-5'>
          <span className='absolute left-[50px] top-[-20px] rounded-full bg-destructive p-1.5 text-xs text-destructive-foreground'>
            Deployment fee: 0.00 ETH
          </span>

          <span className='absolute right-[30px] top-[-20px] rounded-full bg-destructive p-1.5 text-xs text-destructive-foreground'>
            LIMITED TIME OFFER
          </span>

          <div className='flex h-10 w-fit items-center gap-x-2.5 rounded-md border border-border p-2.5 text-foreground'>
            <p className='text-muted-foreground'>Deployment fee: </p>
            <div className='relative flex gap-x-1'>
              <span className='font-medium'>{formatUnits(deploymentFee ?? 0n, 18)}</span>
              <span className='font-medium'>
                {activeChain ? activeChain.network.nativeCurrency.symbol : 'ETH'}
              </span>

              <span className='absolute top-1/2 h-1 w-full rotate-3 bg-destructive opacity-80' />
            </div>

            {/* ACTUAL CODE TO DISPLAY DEPLOYMENT FEE */}
            {/* {isDeploymentFeeLoading ? (
              <Skeleton className='h-6 w-[4.5rem]' />
            ) : (
              <div className='flex gap-x-1'>
                <span className='font-medium'>{formatUnits(deploymentFee ?? 0n, 18)}</span>
                <span className='font-medium'>
                  {activeChain ? activeChain.network.nativeCurrency.symbol : 'ETH'}
                </span>
              </div>
            )} */}
          </div>

          <Countdown />

          <Button type='submit' disabled={isDeployERC404Loading}>
            {isDeployERC404Loading ? (
              <div className='flex items-center gap-x-2.5'>
                <Loader2 className='h-5 w-5 animate-spin' />
                <span>Deploying collection</span>
              </div>
            ) : (
              'Deploy collection'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
