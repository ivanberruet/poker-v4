'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAppContext } from '@/context';

export default function Structure() {
  const { settings } = useAppContext();
  const structure = settings.structure;

  return (
    <Table className="w-fit lg:min-w-[400px]">
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="w-[100px]">Nivel</TableHead>
          <TableHead className="w-[100px]">Ciega chica</TableHead>
          <TableHead className="w-[100px]">Ciega Grande</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {structure.map((row) => (
          <TableRow key={row.level} className="h-[40px]">
            <TableCell>{row.level}</TableCell>
            <TableCell>{row.smallBlind}</TableCell>
            <TableCell>{row.bigBlind}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
