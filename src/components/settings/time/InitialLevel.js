import React from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppContext } from '@/context'

export default function InitialLevel() {
  const {settings, setSettings} = useAppContext()
  
  const initialLevel = settings.time.initialLevel

  let optionValues = []  
  for (let i = 1; i < 30; i++) {
    optionValues.push(i)
  }

  const handleChange = (value) => {
    setSettings({
      ...settings, 
      time: {
        ...settings.time, 
        initialLevel: value
      }
    })
  }
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>Nivel inicial</Label>
      <Select defaultValue={initialLevel} onValueChange={(value)=>handleChange(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Nivel..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {optionValues.map((value) => {
              return (
                <SelectItem value={value} key={value}>
                  {value}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
