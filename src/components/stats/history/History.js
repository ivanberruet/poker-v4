import React from 'react'
import Stats from './StatsCard'
import { DataTable } from './DataTable'

export default function History() {

  return (
    <div className=" mx-auto sm:py-6 text-white">
      <Stats />
      <DataTable />
    </div>
  )
}
