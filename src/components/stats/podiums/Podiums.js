'use client'
import React from 'react'
import { formatPodiums } from '@/lib/utils';
import Table from './Table';

export default function Podiums({history}) {

  const PODIUMS = formatPodiums(history.filter((row) => row.position <= 3))
	const players = {};

  PODIUMS.forEach((item) => {
    const { firstPlace, secondPlace, thirdPlace } = item;

    // Initialize the player if not already present
    if (!players[firstPlace]) {
      players[firstPlace] = {
        first: 0,
        second: 0,
        third: 0,
      };
    }
    if (!players[secondPlace]) {
      players[secondPlace] = {
        first: 0,
        second: 0,
        third: 0,
      };
    }
    if (!players[thirdPlace]) {
      players[thirdPlace] = {
        first: 0,
        second: 0,
        third: 0,
      };
    }

    // Increment the count for each player in the respective position
    players[firstPlace].first++;
    players[secondPlace].second++;
    players[thirdPlace].third++;
  });

  // Sort the players based on their number of first-place finishes, then second-place and third-place finishes
  const sortedPlayers = Object.keys(players).sort((a, b) => {
    const firstPlaceDiff = players[b].first - players[a].first;
    const secondPlaceDiff = players[b].second - players[a].second;
    const thirdPlaceDiff = players[b].third - players[a].third;
    return firstPlaceDiff || secondPlaceDiff || thirdPlaceDiff;
  });

  console.log("players", players);
  console.log("sortedPlayers", sortedPlayers);

  
  return (
		<div className='flex py-6'>
        <Table sortedPlayers={sortedPlayers} players={players} />
    </div>
  );
}
