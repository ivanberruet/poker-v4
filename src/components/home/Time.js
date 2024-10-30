'use client'
import { useAppContext } from '@/context';
import React, { useState } from 'react'

export default function Time() {
  const {game} = useAppContext();
  const {isStarted, inGameTime} = game
  const [currtentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false}))
	const hours = Math.floor(inGameTime / 3600);
  const minutes = Math.floor((inGameTime % 3600) / 60);
  
  setInterval(() => {
		setCurrentTime(new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false}));
	}, 1000)

  return (
    <section className='Time | flex justify-between'>
      <div className='lg:text-3xl flex flex-col xl:flex-row gap-2'>
        <span>Hora:</span>
        <span>{currtentTime}</span>
      </div>

      <div className='lg:text-3xl flex flex-col xl:flex-row gap-2'>
        <span>En juego:</span>
        <span>
          {isStarted
            ? ` ${hours < 10 ? "0" : ""}${hours}:${ minutes < 10 ? "0" : ""}${minutes}`
          : " 00:00"
          }
        </span>
      </div>
    </section>
  )
}
