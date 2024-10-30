import React from 'react'
import Time from '@/components/home/Time';
import Info from '@/components/home/Info';
import Money from '@/components/home/Money';
import Players from '@/components/home/Players';
import Game from '@/components/home/Game';

export default function Home() {

  return (
    <div className="w-full flex flex-col gap-4 px-6 sm:py-10 xl:py-4">
      <Time />
      <div className='Home Page | w-full grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Game />
        <Info />
        <Players />
        <Money />
      </div>
    </div>
  )
}