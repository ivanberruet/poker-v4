'use client'
import { useAppContext } from '@/context'
import React, { useContext } from 'react'

export default function Rules() {
  const {settings} = useAppContext()
  const entry = new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS', maximumFractionDigits: 0}).format(settings.money.entry)
  const prizes = settings.money.prizes
  const percentages = settings.money.prizes.percentages
  const timePerLevel = settings.time.timePerLevel

  let options = Array.from({ length: prizes.winners }, (_, i) => i + 1);

  console.log("winners", prizes.winners);
  

  return (
    <div className='flex flex-col py-6 gap-6'>
        <div className='w-full underline underline-offset-4 lg:text-3xl'>Información del torneo</div>
			  <ul className='flex flex-col text-sm lg:text-xl gap-5'>
				<li className='list-inside list-disc marker:text-xl py-1 pt-2'>Modalidad de juego Texas Hold'em, dos cartas en mano (preflop) y 5 en mesa (flop, turn y river).</li>
				<li className='list-inside list-disc marker:text-xl py-1'>Entrada {entry}.</li>
				<li className='list-inside list-disc marker:text-xl py-1'>1 reingreso por jugador permitido hasta antes de quedar solo 2 jugadores en juego ({entry} el reingreso).</li>
				<li className='list-inside list-disc marker:text-xl py-1'>Cada jugador inicia con un mínimo de 1500 en fichas (150 BB). Pueden ser más dependiendo de la cantidad de jugadores.</li>
				<li className='list-inside list-disc marker:text-xl py-1'>Incremento de ciegas cada {timePerLevel} minutos.</li>
				<li className='list-inside list-disc marker:text-xl py-1'>El pozo se conforma con la entrada de los jugadores y se le incorpora cada reingreso que se efectúe.</li>
				{
        prizes.winners < 3 
          ? options.map((_, i) => (
					  <li key={i} className='list-inside list-disc marker:text-xl py-1'>Al {i+1}° Puesto se le otorga un premio de {percentages[i]}% del pozo.</li>
            ))
          :options.map((_, i) => (
					  <li key={i} className='list-inside list-disc marker:text-xl py-1'>Al {i+1}° Puesto se le otorga un premio de {percentages[i]-5}% del pozo.</li>
            ))
        }

				<li className='list-inside list-disc marker:text-xl py-1 pb-2'>Todos amigos y gente cercana, ambiente muy tranquilo.</li>
			</ul>
    </div>
  )
}
