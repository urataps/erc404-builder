'use client';

import React from 'react';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import img1 from '@/assets/images/img-1.jpg';
import img2 from '@/assets/images/img-2.jpg';
import img3 from '@/assets/images/img-3.jpg';
import img4 from '@/assets/images/img-4.jpg';
import { CarouselContent, CarouselItem, Carousel as EmblaCarousel } from '@/components/ui/carousel';

const images = [img1, img2, img3, img4];

export default function Carousel() {
  return (
    <EmblaCarousel
      className='h-full w-full'
      opts={{
        align: 'start',
        loop: true
      }}
      plugins={[
        Autoplay({
          delay: 5000
        })
      ]}
    >
      <CarouselContent className='-ml-0 h-full w-full'>
        {images.map((image, index) => (
          <CarouselItem key={image.src} className='h-full w-full'>
            <Image
              src={image}
              alt={`Carousel image number ${index}`}
              className='h-screen w-full object-cover object-center'
              width={image.width}
              height={image.height}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </EmblaCarousel>
  );
}
