import React from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppContext } from '@/context'

export default function TimePerLevel() {
  const {settings, setSettings} = useAppContext()
  
  const timePerLevel = settings.time.timePerLevel

  let optionValues = []  
  for (let i = 10; i < 20; i++) {
    optionValues.push(i)
  }

  const handleChange = (value) => {
    setSettings({
      ...settings, 
      time: {
        ...settings.time, 
        timePerLevel: value
      }
    })
  }
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>Teimpo por nivel</Label>
      <Select defaultValue={timePerLevel} onValueChange={(value)=>handleChange(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Minutos..." />
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
