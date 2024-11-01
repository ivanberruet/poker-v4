'use client';
import { useAppContext } from '@/context';
import React from 'react';

export default function Info() {
  const { settings, game } = useAppContext() || {}; // Safely handle when context is unavailable

  const chipsPerPlayerCount = settings?.chips?.distribution?.[0]?.value || 0;
  const activePlayersCount = settings?.players?.registeredPlayers?.activePlayers?.length || 0;
  const eliminatedPlayersCount = settings?.players?.registeredPlayers?.eliminatedPlayers?.length || 0;
  const reentryPlayersCount = settings?.players?.registeredPlayers?.reentryPlayers?.length || 0;

  const entryCount = activePlayersCount + eliminatedPlayersCount + reentryPlayersCount;
  const chipsCount = entryCount * chipsPerPlayerCount;
  const averageChips = Math.floor(chipsCount / activePlayersCount) || 0;

  const bigBlind = settings?.structure?.[game?.level - 1]?.bigBlind || 0;
  const averageBBs = bigBlind ? Math.floor(averageChips / bigBlind) : 0;

  return (
    <section className='Chips and Info | gridItem isolate bg-muted/20 shadow-lg rounded-xl p-6 flex flex-col gap-4 xl:text-2xl'>
      <p>
        <span className='font-semibold'>Fichas:</span> {Intl.NumberFormat('es-AR').format(chipsCount)}
      </p>
      <p>
        <span className='font-semibold'>Promedio:</span> {Intl.NumberFormat('es-AR').format(averageChips)} ({averageBBs} BB)
      </p>
      <p>
        <span className='font-semibold'>Jugadores:</span> {activePlayersCount} / {activePlayersCount + eliminatedPlayersCount}
      </p>
      <p>
        <span className='font-semibold'>Reentradas:</span> {reentryPlayersCount}
      </p>
    </section>
  );
}
