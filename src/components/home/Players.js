'use client';
import { useAppContext } from '@/context';
import React from 'react'
import TableOfPlayers from './TableOfPlayers';

export default function Players() {
  const {settings} = useAppContext();
  const activePlayers = settings.players.registeredPlayers.activePlayers
  const eliminatedPlayers = settings.players.registeredPlayers.eliminatedPlayers

  return (
    <div className='Players | gridItem isolate bg-muted/20 shadow-lg rounded-xl p-6 lg:col-span-2 lg:row-span-2 flex gap-6'>
    {
      activePlayers.concat(eliminatedPlayers).length < 7
      ? <TableOfPlayers playerList={activePlayers.concat(eliminatedPlayers)} />
      : activePlayers.concat(eliminatedPlayers).length < 14
      ? 
        <>
          <TableOfPlayers playerList={activePlayers.concat(eliminatedPlayers).slice(0,7)} />
          <TableOfPlayers playerList={activePlayers.concat(eliminatedPlayers).slice(7,activePlayers.concat(eliminatedPlayers).length)} />
        </>
      :
        <>
          <TableOfPlayers playerList={activePlayers.concat(eliminatedPlayers).slice(0,7)} />
          <TableOfPlayers playerList={activePlayers.concat(eliminatedPlayers).slice(7,14)} />
          <TableOfPlayers playerList={activePlayers.concat(eliminatedPlayers).slice(14,activePlayers.concat(eliminatedPlayers).length)} />
        </>
    }
  </div>
)
}
