import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getMonthRange(array) {
  // Sort the array based on the date
  array.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Get the first and last months in the sorted array
  const firstMonth = array[0].month;
  const lastMonth = array[array.length - 1].month;

  return {
      from: firstMonth,
      to: lastMonth
  };
}

export function aggregateHistoryByDate(data) {
  return Object.values(
      data.reduce((acc, row) => {
          const [day, month, year] = row.date.split("/");
          const date = new Date(year, month - 1, day).toISOString(); // Normalize the date format

          // Update or initialize the tournament count
          if (acc[date]) {
              acc[date].players++;
          } else {
              acc[date] = { date: date, players: 1 };
          }

          return acc;
      }, {})
  );
}

export function getYearlyStats(data) {
  // Group data by year and calculate min, max, and total for each year
  const groupedByYear = data.reduce((acc, entry) => {
      const year = new Date(entry.date).getFullYear();
      const players = entry.players;
      const date = entry.date;

      if (!acc[year]) {
          acc[year] = {
              min: { value: players, date: date },
              max: { value: players, date: date },
              totalPlayers: players,
              count: 1
          };
      } else {
          if (players < acc[year].min.value) {
              acc[year].min = { value: players, date: date };
          }
          if (players > acc[year].max.value) {
              acc[year].max = { value: players, date: date };
          }
          acc[year].totalPlayers += players;
          acc[year].count += 1;
      }

      return acc;
  }, {});

  // Transform the grouped data into the desired format
  return Object.keys(groupedByYear).map(year => ({
      year: year,
      min: groupedByYear[year].min,
      max: groupedByYear[year].max,
      avg: {
          value: (groupedByYear[year].totalPlayers / groupedByYear[year].count).toFixed(2),
          total: groupedByYear[year].count
      }
  }));
}

export function getPlayersStats(data) {
  const stats = data.reduce(
      (acc, entry) => {
          acc.totalPlayers += entry.players;
          acc.count += 1;
          acc.maxPlayers = Math.max(acc.maxPlayers, entry.players);
          acc.minPlayers = Math.min(acc.minPlayers, entry.players);
          return acc;
      },
      { totalPlayers: 0, count: 0, maxPlayers: -Infinity, minPlayers: Infinity }
  );

  return [
      {stat: 'minPlayers', title: 'Mínimo', value: stats.minPlayers },
      {stat: 'maxPlayers', title: 'Máximo', value: stats.maxPlayers },
      {stat: 'averagePlayers', title: 'Promedio', value: (stats.totalPlayers / stats.count).toFixed(2) },
  ];
}

export function getHistoryTableData(data) {

  let auxData 
  // Calculates tornament length and returns only display columns
  auxData = calculateTournamentLengths(data)

  // Sort by date and position
  auxData = groupByDateAndSort(auxData);

  return auxData;
}

function groupByDateAndSort(data) {
  // Function to parse date from "day/month/year" format
  function parseDate(dateStr) {
      const [day, month, year] = dateStr.split('/');
      return new Date(`${year}-${month}-${day}`);
  }

  // Step 1: Group by date
  const groupedData = data.reduce((acc, item) => {
      if (!acc[item.date]) {
          acc[item.date] = [];
      }
      acc[item.date].push(item);
      return acc;
  }, {});

  // Step 2: Sort groups by date (descending)
  const sortedGroups = Object.keys(groupedData)
      .sort((a, b) => parseDate(b) - parseDate(a))
      .map(date => ({
          date,
          data: groupedData[date].sort((a, b) => parseInt(a.position) - parseInt(b.position))
      }));

  // Step 3: Flatten the sorted groups into a single array
  return sortedGroups.flatMap(group => group.data);
}

function calculateTournamentLengths(data){
  return data.map(row => {
    // Parse date and time
    const [day, month, year] = row.date.split("/");
    
    const startTime = new Date(`${year}-${month}-${day} ${row.strartTime}`);
    let endTime = new Date(`${year}-${month}-${day} ${row.endTime}`);

    // Handle end time that falls on the next day
    if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
    }

    const tournamentLength = (endTime - startTime) / (1000 * 3600); // Duration in minutes

    return {
    //   date: jsDate,
      date: row.date,
      start: row.strartTime,
      end: row.endTime,
      length: tournamentLength,
      position: row.position,
      player: row.player
    };
  });
}

export function calculateTournamentsStats(data) {
    // Create a Map to group tournaments by date
    const uniqueDates = [];
    let totalLength = 0;
  
    // Iterate over the data to populate the Map
    data.forEach(row => {
      const [day, month, year] = row.date.split("/");

      const date = new Date(`${year}-${month}-${day}`).toISOString();
      const length = row.length;
    
      // If the date already exists in the Map, add the length to the existing value
      if (!uniqueDates.includes(date)) {
        uniqueDates.push(date);
        totalLength += length;
      }
    });
    
    // Calculate total tournaments (unique dates) and total length
    const totalTournaments = uniqueDates.length;
    const averageLength = (totalLength / totalTournaments).toFixed(2);
  
    return {
      totalTournaments: totalTournaments, // Total unique dates
      averageLength: averageLength // Total length of all tournaments
    };
  }

export function formatPodiums(data) {
  // Meses en español para facilitar la conversión
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  // Mapa para almacenar los resultados por fecha
  const result = [];

  // Recorrer los datos originales
  data.forEach(tournament => {
      // Obtener la fecha y dividirla en componentes
      
      const [day, month, year] = tournament.date.split("/").map(Number);
      
      // Buscar si ya existe un torneo en el resultado para esa fecha
      const existingTournament = result.find(t => t.year === year && t.month === monthNames[month - 1]);
      
      // Si existe, agregar al lugar correspondiente
      if (existingTournament) {
          if (tournament.position === "1") existingTournament.firstPlace = tournament.player;
          if (tournament.position === "2") existingTournament.secondPlace = tournament.player;
          if (tournament.position === "3") existingTournament.thirdPlace = tournament.player;
      } else {
          // Si no existe, crear un nuevo torneo
          const newTournament = {
              month: monthNames[month - 1],
              year: year,
              firstPlace: tournament.position === "1" ? tournament.player : null,
              secondPlace: tournament.position === "2" ? tournament.player : null,
              thirdPlace: tournament.position === "3" ? tournament.player : null
          };
          result.push(newTournament);
      }
  });
  
  return result;
}

export function getPlayerStatistics(tournaments) {
  const playerStats = {};
  const tournamentDates = new Set(); // To track unique tournament dates

  // Helper function to compare dates in "DD/MM/YYYY" format
  function isMoreRecent(date1, date2) {
      const [day1, month1, year1] = date1.split('/').map(Number);
      const [day2, month2, year2] = date2.split('/').map(Number);

      const dateObj1 = new Date(year1, month1 - 1, day1);
      const dateObj2 = new Date(year2, month2 - 1, day2);

      return dateObj1 > dateObj2;
  }

  // Loop through each tournament entry
  tournaments.forEach(entry => {
      const player = entry.player;
      const position = parseInt(entry.position);
      const date = entry.date;

      // Add tournament date to the set (ensure unique tournaments)
      tournamentDates.add(date);

      // If the player doesn't have a record yet, create one
      if (!playerStats[player]) {
          playerStats[player] = {
              name: player, // Add name key
              Participations: 0,
              Absences: 0,  // To be calculated later
              Podiums: 0,
              BestResult: { position: Infinity, date: null },
              WorstResult: { position: -Infinity, date: null }
          };
      }

      // Update participations
      playerStats[player].Participations += 1;

      // Update podiums (assuming podium is top 3)
      if (position <= 3) {
          playerStats[player].Podiums += 1;
      }

      // Update best result logic:
      const currentBestPosition = playerStats[player].BestResult.position;
      if (position < currentBestPosition) {
          // If a better position is found, update
          playerStats[player].BestResult = {
              position: position,
              date: date
          };
      } else if (position === currentBestPosition) {
          // If the position is the same, choose the most recent date
          if (isMoreRecent(date, playerStats[player].BestResult.date)) {
              playerStats[player].BestResult = {
                  position: position,
                  date: date
              };
          }
      }

      // Update worst result logic:
      const currentWorstPosition = playerStats[player].WorstResult.position;
      if (position > currentWorstPosition) {
          // If a worse position is found, update
          playerStats[player].WorstResult = {
              position: position,
              date: date
          };
      } else if (position === currentWorstPosition) {
          // If the position is the same, choose the most recent date
          if (isMoreRecent(date, playerStats[player].WorstResult.date)) {
              playerStats[player].WorstResult = {
                  position: position,
                  date: date
              };
          }
      }
  });

  // Convert the playerStats object to an array with "name" as a key
  const resultArray = Object.keys(playerStats).map(player => ({
      name: playerStats[player].name,
      participations: playerStats[player].Participations,
      podiums: playerStats[player].Podiums,
      bestResult: playerStats[player].BestResult,
      worstResult: playerStats[player].WorstResult
  }));

  return resultArray;
}