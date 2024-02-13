'use client';

import React, { useEffect, useMemo, useState } from 'react';

import type { Abi } from 'viem';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { formatUnits, isAddress, parseUnits } from 'viem';
import { useChainId } from 'wagmi';
import { z } from 'zod';

import erc404ManagedUri from '@/artifacts/ERC404ManagedURI.json';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';
import { testnetChains } from '@/config/testnet-chains';
import useWriteContract from '@/custom-hooks/use-write-contract';
import { cn } from '@/lib/utils';

type TMintDialog = {
  collectionAddress: string;
  currentSupply: bigint | null;
  totalSupply: bigint | null;
  isDialogTriggerDisabled: boolean;
  dialogTriggerClassName?: string;
  onMintDialogClose(): void;
};

export default function MintDialog({
  collectionAddress,
  currentSupply,
  totalSupply,
  isDialogTriggerDisabled,
  dialogTriggerClassName,
  onMintDialogClose
}: TMintDialog) {
  const chainId = useChainId();
  const activeChain = useMemo(
    () => testnetChains.find((chain) => chain.network.id === chainId) ?? testnetChains[0],
    [chainId]
  );
  const explorer = useMemo(() => activeChain?.network.blockExplorers.default, [activeChain]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const availableSupply = useMemo(() => {
    if (currentSupply !== null && totalSupply !== null) {
      return totalSupply - currentSupply;
    }

    return 0n;
  }, [currentSupply, totalSupply]);

  const formattedCurrentSupply = useMemo(
    () => formatUnits(currentSupply ?? 0n, 18),
    [currentSupply]
  );
  const formattedTotalSupply = useMemo(() => formatUnits(totalSupply ?? 0n, 18), [totalSupply]);
  const formattedAvailableSupply = useMemo(
    () => formatUnits(availableSupply, 18),
    [availableSupply]
  );

  const formSchema = useMemo(
    () =>
      z.object({
        recipientAddress: z
          .string({ required_error: 'is required' })
          .trim()
          .refine((value) => isAddress(value), { message: 'must be a valid address' }),
        mintAmount: z
          .string({ required_error: 'is required' })
          .trim()
          .refine((value) => !Number.isNaN(Number(value)), { message: 'must be a number' })
          .refine((value) => Number(value) > 0, { message: 'must be more than 0' })
          .refine((value) => Number(value) <= Number(formattedAvailableSupply), {
            message: `must be at most ${formattedAvailableSupply}`
          })
      }),
    [formattedAvailableSupply]
  );

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientAddress: '',
      mintAmount: ''
    }
  });

  const {
    isLoading: isMintLoading,
    errorMessage: mintError,
    response: mintResponse,
    writeContract: mint
  } = useWriteContract();

  useEffect(() => {
    if (mintError) {
      toast({
        variant: 'destructive',
        title: mintError.title,
        description: mintError.message
      });
    }
  }, [mintError, toast]);

  useEffect(() => {
    if (mintResponse) {
      const txHash = mintResponse.receipt.transactionHash;

      toast({
        title: 'Success - Mint',
        description: (
          <>
            <p>NFTs minted successfully.</p>
            {explorer ? (
              <Button variant='link' className='h-min px-0 py-0' asChild>
                <Link href={`${explorer.url}/tx/${txHash}`} target='_blank'>
                  View the transaction on {explorer.name}.
                </Link>
              </Button>
            ) : null}
            <span className='absolute bottom-0 left-0 h-2 w-full bg-green-400' />
          </>
        )
      });

      form.reset();
    }
  }, [mintResponse, explorer, form, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const to = values.recipientAddress;
    const erc20Amount = parseUnits(values.mintAmount, 18);

    await mint(
      erc404ManagedUri.abi as Abi,
      'mint',
      [to, erc20Amount],
      (collectionAddress as `0x${string}`) ?? '0x'
    );
  }

  function onDialogOpenChange(open: boolean) {
    if (isMintLoading) {
      return;
    }

    // If dialog is closing & writeContract was triggered
    if (!open && mintResponse !== null) {
      onMintDialogClose();
      // TODO reset useWriteContract responses
    }

    form.reset();
    setIsDialogOpen(open);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn(dialogTriggerClassName)} disabled={isDialogTriggerDisabled}>
          Mint
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[465px]'>
        <DialogHeader>
          <DialogTitle>Mint NFTs</DialogTitle>
          <DialogDescription>
            <span>
              You have minted {formattedCurrentSupply} out of {formattedTotalSupply} NFTs.
            </span>
            <br />
            <span>{formattedAvailableSupply} NFTs are still available to be minted.</span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='recipientAddress'
              disabled={isMintLoading}
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-1'>
                    <FormLabel className='text-base font-semibold'>Recipient address</FormLabel>
                    <FormMessage className='text-base font-semibold' />
                  </div>
                  <FormControl>
                    <Input
                      placeholder='i.e. 0x1ad29E50eE4699Cb9D4967d01B2ACfED52Ee6996'
                      className='placeholder:italic'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='mintAmount'
              disabled={isMintLoading}
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-1'>
                    <FormLabel className='text-base font-semibold'>Mint amount</FormLabel>
                    <FormMessage className='text-base font-semibold' />
                  </div>
                  <FormControl>
                    <Input placeholder='i.e. 50' className='placeholder:italic' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type='submit' disabled={isMintLoading}>
              {isMintLoading ? (
                <div className='flex items-center gap-x-2.5'>
                  <Loader2 className='h-5 w-5 animate-spin' />
                  <span>Minting</span>
                </div>
              ) : (
                'Mint'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
