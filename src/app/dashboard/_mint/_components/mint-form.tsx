'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const formSchema = z.object({
  name: z
    .string({ required_error: 'is required' })
    .min(2, { message: 'must contain at least 2 characters' })
    .max(50, { message: 'must contain at most 50 characters' }),
  supply: z
    .string({ required_error: 'is required' })
    .refine((value) => !Number.isNaN(value), { message: 'must be a number' })
    .refine((value) => Number(value) >= 1, { message: 'must be 1 or more' })
    .refine((value) => Number(value) <= 20_000, { message: 'must be at most 20,000' }),
  description: z.optional(z.string())
});

export default function MintForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      supply: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-1'>
                <FormLabel className='text-base font-semibold'>Name</FormLabel>
                <FormMessage className='!font-semibold' />
              </div>
              <FormControl>
                <Input placeholder='Name of your NFT' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='supply'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-1'>
                <FormLabel className='text-base font-semibold'>Supply</FormLabel>
                <FormMessage className='!font-semibold' />
              </div>
              <FormControl>
                <Input placeholder='1' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-1'>
                <FormLabel className='text-base font-semibold'>Description</FormLabel>
                <FormMessage className='font-semibold' />
              </div>
              <FormControl>
                <Input placeholder='Fill in a description' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit'>Continue</Button>
      </form>
    </Form>
  );
}
