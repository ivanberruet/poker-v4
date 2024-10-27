'use client'
import React, { useEffect } from 'react'
import { getPlayerStatistics } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card'

export default function Players({history}) {

  const STATS = getPlayerStatistics(history)
  
  const handleChange = (value) => {
    const CARDS = Array.from(document.getElementsByClassName('player-card'))
    console.log("value", value)
    for (let i = 0; i < CARDS.length; i++) {
      if(value === ""){
        CARDS[i].classList.remove('hidden')
      }
      else if(CARDS[i].id == value){
        console.log(CARDS[i].id, "removing hidden")
        CARDS[i].classList.remove('hidden')
      }
      else{
        CARDS[i].classList.add('hidden')
      }
    
    }
  }  

  return (
    <div className='flex flex-col py-6 gap-4 lg:max-w-[80%]'>

      <select id='player-select' className='bg-transparent border border-muted px-3 py-2 rounded-lg w-max' onChange={(e)=>handleChange(e.target.value)}>
        <option value={""} className="bg-background text-foreground">Todos...</option>
        {STATS.map((player) => {
          return (
            <option value={player.name} key={player.name} className="bg-background text-foreground">
              {player.name}
            </option>
          )
        })}
      </select>

      {STATS.map((player) => {
        let bestColor = player.bestResult.position == 1 ? 'text-gold' : player.bestResult.position == 2 ? 'text-silver' : player.bestResult.position == 3 ? 'text-bronze' : ''

        return (
          <Card className="player-card | border-muted" id={player.name} key={player.name}>
            <CardContent className="flex flex-col gap-4 px-4 py-8 lg:flex-row">
              <div className="grid flex-1 auto-rows-min gap-1">
                  <div className="text-sm text-muted-foreground">Nombre</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                      {player.name}
                  </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-1">
                <div className="text-sm text-muted-foreground">Participaciones</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {player.participations}
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-1">
                <div className="text-sm text-muted-foreground">Podios</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {player.podiums}
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-1">
                <div className="text-sm text-muted-foreground">Mejor resultado</div>
                <div className={`flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none ${bestColor}`}>
                {player.bestResult.position}
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-1">
                <div className="text-sm text-muted-foreground">Fecha</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {player.bestResult.date}
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-1">
                <div className="text-sm text-muted-foreground">Peor resultado</div>
                <div className={`flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none`}>
                {player.worstResult.position}
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-1">
                <div className="text-sm text-muted-foreground">Fecha</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {player.worstResult.date}
                </div>
              </div>
            </CardContent>
          </Card>
        )
        })
      }
    </div>
  )
}
