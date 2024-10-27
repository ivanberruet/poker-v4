export const columns = [
  // date
  {
    accessorKey: "date",
    header: "Fecha",
  },
  // position
  {
      accessorKey: "position",
      header: "Posición",
      cell: ({ row }) => {
          const position = row.getValue("position")
          if(position === "1") return <div className="font-medium text-yellow-500">{position}°</div>
          else if(position === "2") return <div className="font-medium text-gray-300">{position}°</div>
          else if(position === "3") return <div className="font-medium text-amber-900">{position}°</div>
          else return <div className="font-medium text-gray-500">{position}°</div>
        },
  },
  // player'
  {
      accessorKey: "player",
      header: "Jugador",
  },
  // length
  {
    accessorKey: "length",
    header: "Duración",
    cell: ({ row }) => {
        const hours = Math.floor(row.getValue("length"))
        const minutes = Math.floor((row.getValue("length") - hours) * 60)
        const formatted = minutes === 0 ? `${hours} h` : `${hours} h ${minutes} m`
  
        return <div className="font-medium">{formatted}</div>
      },

  },
  // start
  {
    accessorKey: "start",
    header: "Inicio",
  },
  // end
  {
      accessorKey: "end",
      header: "Fin",
  },
]
