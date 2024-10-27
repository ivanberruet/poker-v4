import React from 'react'
import Entry from './Entry'
import Winners from './Winners'

export default function Money() {
  return (
    <div className='flex flex-col py-6 gap-6'>

      <Entry />

      <Winners />

    </div>
  )
}
