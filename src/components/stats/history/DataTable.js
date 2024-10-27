'use client';
import React, { useState } from "react";
import {getFacetedUniqueValues,getPaginationRowModel,getFilteredRowModel,getSortedRowModel,flexRender,getCoreRowModel,useReactTable, getFacetedRowModel,} from "@tanstack/react-table";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
  
export function DataTable({ columns, data }) {
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({date: true,position: true,player: true,length: true,start: false, end: false });
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 20, //default page size
    });

    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
        columnFilters,
        columnVisibility,
        pagination,
        },
    });

    
    function DateFilter({ column }) {
        
        const columnFilterValue = column.getFilterValue()
        
        const sortedUniqueValues = React.useMemo(() =>
            Array.from(column.getFacetedUniqueValues().keys())
                .slice(0, 5000),
            [column.getFacetedUniqueValues()]
        )  
    
        return (
        <select
            className="bg-transparent border border-muted px-2 py-2 rounded-lg"
            onChange={e => column.setFilterValue(e.target.value)}
            value={columnFilterValue}
        >
            <option value="" className="bg-background text-foreground">Torneo...</option>
            {sortedUniqueValues.map((value,i) => {
                const [day, month, year] = value.split("/");
                const displayDate = new Date(`${year}-${month}-${day}`).toLocaleDateString("es-ES", {month:"short", year:"numeric"})
                return (
                    //dynamically generated select options from faceted values feature
                    <option className="bg-background text-foreground" value={value} key={i}>
                        {displayDate.toUpperCase()}
                    </option>
                )
            })}
        </select>
        ) 
    }
    
    return (
        <div className="w-full">

            {/* Filters */}
            <div className="flex gap-2 items-center py-4">
                {/* Date */}
                <DateFilter column={table.getColumn("date")} />

                {/* Player */}
                <Input placeholder="Jugador..."
                value={(table.getColumn("player")?.getFilterValue()) ?? ""}
                onChange={(event) =>
                    table.getColumn("player")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                />
                
                {/* Columns */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                        Columnas
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background">
                        {table
                        .getAllColumns()
                        .filter(
                            (column) => column.getCanHide()
                        )
                        .map((column) => {
                            let displayName 
                            
                            if(column.id === "date") displayName = "Fecha"
                            else if(column.id === "position") displayName = "Posición"
                            else if(column.id === "player") displayName = "Jugador"
                            else if(column.id === "length") displayName = "Duración"
                            else if(column.id === "start") displayName = "Inicio"
                            else if(column.id === "end") displayName = "Fin"

                            
                            return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize text-foreground"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                                }
                            >
                                {displayName}
                            </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            {/* Table */}
            <div>
                <div className="rounded-md border border-muted xl|
                :max-w-[80%]">
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </TableHead>
                        ))}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() ? "selected" : undefined}
                            className="border-muted"
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </div>

                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    >
                    Anterior
                    </Button>
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    >
                    Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
}
  