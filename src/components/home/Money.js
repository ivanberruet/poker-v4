'use client';
import { useAppContext } from '@/context';
import React from 'react'

export default function Money() {
  const {settings} = useAppContext();
  const pool = settings.money.prizes.pool;
  const winners = settings.money.prizes.winners;
  const options = Array.from({ length: winners }, (_, i) => i + 1);
  const percentages = settings.money.prizes.percentages;
  return (
    <div className='Prizes | gridItem isolate bg-muted/20 shadow-lg rounded-xl p-6 flex flex-col gap-4 lg:text-2xl'>
    <p className='lg:text-3xl'><span className='font-semibold'>Pozo:</span> ${new Intl.NumberFormat('es-AR').format(pool)}</p>
    <div className='grid gap-2 '>
      {options.map((_,i) => {
        let percentage = winners < 3 ? percentages[i] : percentages[i]-5
        let prize = percentage*pool/100
        return (
        <p key={i}><span className='font-semibold'>{i+1}º Puesto:</span> ${new Intl.NumberFormat('es-AR').format(prize)}</p>
      )})}
    </div>
  </div>
)
}
