'use client'
import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import Players from '@/components/settings/players/Players'
import Money from '@/components/settings/money/Money'
import Time from '@/components/settings/time/Time'
import Chips from '@/components/settings/chips/Chips'
import { useAppContext } from '@/context'
import Loading from '../Loading'
import handleChipsTobeUsed from '@/lib/handleChipsTobeUsed'

export default function Settings() {
  const {settings, setSettings } = useAppContext();
  console.log("settings", settings);
  const activePlayersCount = settings.players.registeredPlayers.activePlayers.length
  const eliminatedPlayersCount = settings.players.registeredPlayers.eliminatedPlayers.length
  const reentryPlayersCount = settings.players.registeredPlayers.reentryPlayers.length
  const entry = settings.money.entry
  
  useEffect(() => {
    setSettings(prevSettings => (
      {...prevSettings,
        money: {
          ...prevSettings.money,
          prizes: {
            ...prevSettings.money.prizes,
            pool: (activePlayersCount+eliminatedPlayersCount+reentryPlayersCount)*entry 
          }
        }
      }
    ))
    
  }, [activePlayersCount, reentryPlayersCount, entry])

  const availableChips = settings.chips.available

  useEffect(() => {
    console.log(handleChipsTobeUsed(settings.chips, settings.players.registeredPlayers));
    setSettings(prevSettings => (
      {...prevSettings,
        chips: {
          ...prevSettings.chips,
          distribution: handleChipsTobeUsed(settings.chips, settings.players.registeredPlayers)
        }
      }
    ))

  }, [activePlayersCount, availableChips])


  return (
    settings.isLoading ? <Loading /> : 

    <div className="w-full flex flex-col gap-4 p-6 sm:py-10">
        <Tabs defaultValue="Players" className="w-full">
             <TabsList className="w-fit text-white flex gap-4 p-1 bg-muted rounded-xl mb-4 text-xs sm:text-xl">
                 <TabsTrigger value="Players" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Jugadores</TabsTrigger>
                <TabsTrigger value="Money" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Dinero</TabsTrigger>
                <TabsTrigger value="Time" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Tiempo</TabsTrigger>
                <TabsTrigger value="Chips" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Fichas</TabsTrigger>
            </TabsList>

            <TabsContent value="Players"><Players /></TabsContent>
            <TabsContent value="Money"><Money /></TabsContent>
            <TabsContent value="Time"><Time /></TabsContent>
            <TabsContent value="Chips"><Chips /></TabsContent>
            
        </Tabs>    
    </div>
  )
}
