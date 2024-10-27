'use client'
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({});

export function AppWrapper({ children }) {

  const [settings, setSettings] = useState(
      {
        players : {
          dbPlayers: [], 
          availablePlayers: [], 
          registeredPlayers: {
            activePlayers: [], 
            eliminatedPlayers: [],
            reentryPlayers: []
          } 
        }, 
        money: {
          entry: 5000,
          reentry: 5000,
          prizes: {
            pool: 0,
            winners: 2, 
            percentages: [70, 30, 15],
          }
        }, 
        time: {
          timePerLevel: 15,
          initialLevel: 1
        }, 
        chips: {
          available: [],
          distribution: []
        },
        structure: {},
        isLoading: true,
      }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Run both fetch calls concurrently
        const [playersRes, chipsRes, blindsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chips`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blinds`)
        ]);
  
        const [playersData, chipsData, blindsData] = await Promise.all([
          playersRes.json(),
          chipsRes.json(),
          blindsRes.json()
        ]);
  
        setSettings(oldSettings => {
          const updatedChips = chipsData.map(chip => ({
            ...chip, 
            active: true,
            white:{quantity: parseInt(chip.white), value: 5},
            red:{quantity: parseInt(chip.red), value: 10},
            green:{quantity: parseInt(chip.green), value: 25},
            blue:{quantity: parseInt(chip.blue), value: 50},
            black:{quantity: parseInt(chip.black), value: 100}
          }));
          return ({
          ...oldSettings,
          players: {
            ...oldSettings.players,
            dbPlayers: playersData,
            availablePlayers: playersData
          },
          chips: {
            ...oldSettings.chips,
            available: updatedChips,
          },
          structure: blindsData,
          isLoading: false
        })});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return <AppContext.Provider value={{settings, setSettings}}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}