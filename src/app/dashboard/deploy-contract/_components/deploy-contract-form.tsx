/* eslint-disable sonarjs/no-duplicate-string */

'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { cn } from '@/lib/utils';

enum EChain {
  ethereum = 'Ethereum',
  linea = 'Linea'
}

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
    .max(3, { message: 'must contain at most 3 characters' })
    .refine((value) => value === value.toUpperCase(), {
      message: 'must contain only uppercase characters'
    }),
  totalSupply: z
    .string({ required_error: 'is required' })
    .trim()
    .refine((value) => !Number.isNaN(Number(value)), { message: 'must be a number' })
    .refine((value) => Number(value) >= 1, { message: 'must be 1 or more' })
    .refine((value) => Number(value) <= 20_000, { message: 'must be at most 20,000' }),
  chain: z.enum([EChain.ethereum, EChain.linea])
});

const email = 'hello@defibuilder.com';

export default function DeployContractForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenName: '',
      tokenSymbol: '',
      totalSupply: '',
      chain: EChain.ethereum
    }
  });

  const chains = [
    {
      name: 'Ethereum',
      icon: 'https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png',
      badge: 'Most popular',
      gasEstimation: 25.69
    },
    {
      name: 'Linea',
      icon: 'https://s3.coinmarketcap.com/static-gravity/image/203ccaf09aa64c19bc8989db729468a6.jpg',
      badge: 'Cheaper',
      gasEstimation: 5.23
    }
  ];

  function handleRadioChange(value: EChain) {
    form.setValue('chain', value);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='tokenName'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-1'>
                <FormLabel className='text-base font-semibold'>Token name</FormLabel>
                <FormMessage className='text-base font-semibold' />
              </div>
              <FormControl>
                <Input placeholder='My Collection Name' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tokenSymbol'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-1'>
                <FormLabel className='text-base font-semibold'>Token symbol</FormLabel>
                <FormMessage className='text-base font-semibold' />
              </div>
              <FormControl>
                <Input placeholder='DFB' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='totalSupply'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-1'>
                <FormLabel className='text-base font-semibold'>Total supply</FormLabel>
                <FormMessage className='text-base font-semibold' />
              </div>
              <FormControl>
                <Input placeholder='1,000' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='chain'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-semibold'>Blockchain</FormLabel>
              <FormControl className='flex gap-x-5'>
                <RadioGroup defaultValue={EChain.ethereum} onValueChange={field.onChange}>
                  {chains.map((chain) => (
                    <FormItem
                      key={chain.name}
                      className={cn(
                        'flex w-48 cursor-pointer items-center rounded-md border border-border p-2.5 transition-colors',
                        {
                          'border-primary': form.getValues('chain') === (chain.name as EChain),
                          'hover:border-primary/75':
                            form.getValues('chain') !== (chain.name as EChain)
                        }
                      )}
                      onClick={() => handleRadioChange(chain.name as EChain)}
                    >
                      <FormControl>
                        <RadioGroupItem value={chain.name} className='sr-only' />
                      </FormControl>

                      <div className='flex flex-col gap-y-2.5'>
                        <Image
                          src={chain.icon}
                          alt={`${chain.name}'s logo`}
                          width={30}
                          height={30}
                          className='rounded-full'
                        />
                        <FormLabel className='cursor-pointer text-base font-medium'>
                          {chain.name}
                        </FormLabel>
                        <Badge variant='secondary' className='w-fit'>
                          {chain.badge}
                        </Badge>
                        <p className='text-sm text-muted-foreground'>
                          Estimated cost to deploy contract:
                          <span className='font-medium'>&nbsp;{chain.gasEstimation}&nbsp;</span>
                          USD
                        </p>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <div className='my-5 text-sm'>
          <p>Are we missing some features?</p>
          <p>
            Drop us an email at:{' '}
            <Link
              href={`mailto:${email}`}
              className='font-medium text-primary/75 transition-colors hover:text-primary'
            >
              {email}
            </Link>
          </p>
        </div>

        <Button type='submit'>Continue</Button>
      </form>
    </Form>
  );
}
