'use client'
import { calculateTournamentsStats, getHistoryTableData } from '@/lib/utils'
import React from 'react'
import { DataTable } from './DataTable'
import { columns } from './columns'
import Stats from './StatsCard'

export default function History({history}) {

  const tableData = getHistoryTableData(history)
  const stats = calculateTournamentsStats(tableData);

  // console.log("tableData", tableData);
  
  return (
    <div className=" mx-auto sm:py-6 text-white">
      <Stats stats={stats} />
      <DataTable columns={columns} data={tableData} />
    </div>
  )
}
