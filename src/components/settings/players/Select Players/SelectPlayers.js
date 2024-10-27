'use client'
import React, { useState } from 'react'
import { Button } from '../../../ui/button'
import { PersonIcon } from '@radix-ui/react-icons'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DataTable } from './DataTable'
import { columns } from './columns'
import { DialogClose } from '@radix-ui/react-dialog'
import { useAppContext } from '@/context'

export default function SelectPlayers() {
  
  const [rowSelection, setRowSelection] = useState({})
  const {settings, setSettings} = useAppContext();
  const availablePlayers = settings.players.availablePlayers
  
  
  const handelClick = () => {
    const selectedRowsID = Object.keys(rowSelection);
    const { selectedPlayers, filteredAvailablePlayers } = getSelectedAndFilterOutPlayers(availablePlayers, selectedRowsID);
    setSettings(prevSettings => (
      {...prevSettings, 
        players: {
          ...prevSettings.players, 
          availablePlayers: filteredAvailablePlayers, 
          registeredPlayers: {
            ...prevSettings.players.registeredPlayers,
            activePlayers: [...prevSettings.players.registeredPlayers.activePlayers, ...selectedPlayers.map(p => ({id: p.id, name: p.name, nick: p.nick, reentry: false, position: ''}))],
          }
        },
      }
    ))
    setRowSelection({})
  }
  
  const getSelectedAndFilterOutPlayers = (availablePlayers, selectedRowsID) => {
    // Retrieve selected players based on the selectedRowsID array
    const selectedPlayers = selectedRowsID.map(rowId => availablePlayers[rowId]);
  
    // Filter out the selected players from the availablePlayers array
    const filteredAvailablePlayers = availablePlayers.filter((_, index) => !selectedRowsID.includes(index.toString()));
  
    return { selectedPlayers, filteredAvailablePlayers };
  }

  return (
    <Dialog>
      <DialogTrigger asChild  className="w-fit">
        <Button variant="outline"><PersonIcon className='w-5 h-5 mr-2' />Seleccionar jugadores</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80%]">
        <DialogHeader>
          <DialogTitle>Seleccionar jugadores</DialogTitle>
          <DialogDescription>
            Selecciona todos los participantes para el torneo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DataTable columns={columns} data={availablePlayers} rowSelection={rowSelection} setRowSelection={setRowSelection} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="text-foreground-muted" onClick={() => handelClick()} >
              Agregar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
