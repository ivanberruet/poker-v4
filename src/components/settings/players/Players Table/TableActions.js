'use client'
import React from 'react'
import { useAppContext } from '@/context';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';

export function TableActions({playerID}) {
  const {settings, setSettings} = useAppContext();
  
  const handleReentry = () => {
    const playerObj = settings.players.registeredPlayers.activePlayers.find(p => p.id === playerID)

    const updatedPlayerObj = {
      ...playerObj, 
      reentry: !playerObj.reentry, 
      reentryTime: !playerObj.reentry ? new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}) : ''
    }

    console.log("updatedPlayerObj", updatedPlayerObj );
    

    setSettings(prevSettings => (
      {...prevSettings,
        players: {
          ...prevSettings.players,
          registeredPlayers: {
            ...prevSettings.players.registeredPlayers,

            activePlayers: prevSettings.players.registeredPlayers.activePlayers.map(p => p.id === playerID ? updatedPlayerObj : p),

            reentryPlayers: !playerObj.reentry 
            ? [...prevSettings.players.registeredPlayers.reentryPlayers, updatedPlayerObj]
            : prevSettings.players.registeredPlayers.reentryPlayers.filter(p => p.id !== playerID),
          }
        }
      }
    ))
  }

  const handleDelete = () => {
    console.log("click", settings.players.registeredPlayers.activePlayers.find(p => p.id === playerID));
    setSettings(prevSettings => (
      {...prevSettings,
        players: {
          ...prevSettings.players,
          availablePlayers: [...prevSettings.players.availablePlayers, settings.players.registeredPlayers.activePlayers.find(p => p.id === playerID)],
          registeredPlayers: {
            ...prevSettings.players.registeredPlayers,
            activePlayers: prevSettings.players.registeredPlayers.activePlayers.filter(p => p.id !== playerID),
            
          }
        }
      }
    ))
  }

  const handleElimination = () => {
    const playerObj = settings.players.registeredPlayers.activePlayers.find(p => p.id === playerID)
    const activePlayersCount = settings.players.registeredPlayers.activePlayers.length
    const eliminatedPlayersCount = settings.players.registeredPlayers.eliminatedPlayers.length
    const registeredPlayersCount = activePlayersCount + eliminatedPlayersCount
    setSettings(prevSettings => (
      {...prevSettings,
        players: {
          ...prevSettings.players,
          registeredPlayers: {
            ...prevSettings.players.registeredPlayers,
            activePlayers: prevSettings.players.registeredPlayers.activePlayers.filter(p => p.id !== playerID),
            eliminatedPlayers: [
              {
                ...playerObj,
                position: registeredPlayersCount-eliminatedPlayersCount,
                eliminatedTime: new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})
              }, 
              ...prevSettings.players.registeredPlayers.eliminatedPlayers]
          }
        }
      }
    ))
  }

  const nick = settings.players.registeredPlayers.activePlayers.find(p => p.id === playerID).nick
  const reentry = settings.players.registeredPlayers.activePlayers.find(p => p.id === playerID).reentry

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><DotsHorizontalIcon /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Acciones:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span variant="outline" className="w-full cursor-pointer" onClick={()=>handleReentry()}>{!reentry ? "Anotar reentrada" : "Quitar reentrada"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span variant="outline" className="w-full cursor-pointer" onClick={()=>handleElimination()}>Eliminar</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-500">
          <span variant="outline" className="w-full cursor-pointer" onClick={()=>handleDelete()}>Borrar</span>
          <DropdownMenuShortcut><TrashIcon /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
