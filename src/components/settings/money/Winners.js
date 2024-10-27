import React from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppContext } from '@/context'

export default function Winners() {
  const {settings, setSettings} = useAppContext()

  const handleChange = (value) => {
    setSettings({
      ...settings, 
      money: {
        ...settings.money, 
        prizes:{
          ...settings.money.prizes, 
          winners: value
        } 
      }
    })
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>Cantidad de ganadores</Label>
      <Select defaultValue={2} onValueChange={(value)=>handleChange(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ganadores" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={2}>2</SelectItem>
            <SelectItem value={3}>3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
)
}
