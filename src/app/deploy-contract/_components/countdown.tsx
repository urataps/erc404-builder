'use client';

import React, { useEffect, useState } from 'react';

import { differenceInSeconds } from 'date-fns';

const Countdown: React.FC = () => {
  const [endTime] = useState(() => {
    const now = new Date('2024-02-14 17:00');
    const end = new Date(now);
    end.setSeconds(now.getSeconds() + 24 * 60 * 60);
    return end;
  });

  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    differenceInSeconds(endTime, new Date())
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingSeconds((previousRemainingSeconds) => {
        if (previousRemainingSeconds > 0) {
          return previousRemainingSeconds - 1;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const remainingTime = {
    hours: Math.floor(remainingSeconds / 3600),
    minutes: Math.floor((remainingSeconds % 3600) / 60),
    seconds: remainingSeconds % 60
  };

  return (
    <div className='flex gap-x-2.5'>
      <div className='flex w-9 flex-col items-center'>
        <span className='font-medium'>{remainingTime.hours}</span>
        <span className='text-xs text-muted-foreground'>hours</span>
      </div>
      :
      <div className='flex w-[3.25rem] flex-col items-center'>
        <span className='font-medium'>{remainingTime.minutes}</span>
        <span className='text-xs text-muted-foreground'>minutes</span>
      </div>
      :
      <div className='flex w-14 flex-col items-center'>
        <span className='font-medium'>{remainingTime.seconds}</span>
        <span className='text-xs text-muted-foreground'>seconds</span>
      </div>
    </div>
  );
};

export default Countdown;
