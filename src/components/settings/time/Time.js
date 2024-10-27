import React from 'react'
import TimePerLevel from './TimePerLevel'
import InitialLevel from './InitialLevel'

export default function Time() {
  return (
    <div className='flex flex-col py-6 gap-6'>
      <TimePerLevel />
      <InitialLevel />
    </div>
  )
}
