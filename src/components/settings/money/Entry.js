import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppContext } from '@/context'
import React from 'react'

export default function Entry() {
  const {settings, setSettings} = useAppContext()
  
  const entry = settings.money.entry
  console.log("entry", entry);

  const optionValues = [5,6,7,8,9,10,11,12,13,14,15]

  const handleChange = (value) => {
    setSettings({
      ...settings, 
      money: {
        ...settings.money, 
        entry: value, 
        reentry: value
      }
    })
  }


  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>Valor de la entrada</Label>
      <Select defaultValue={entry} onValueChange={(value)=>handleChange(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Entrada..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {optionValues.map((value) => {
              return (
                <SelectItem value={value*1000} key={value*1000}>
                  {Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS', maximumFractionDigits: 0}).format(value*1000)}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
