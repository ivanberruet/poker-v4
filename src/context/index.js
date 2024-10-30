'use client'
import { useToast } from "@/hooks/use-toast";
import { saveInfo } from "@/lib/saveInfo";
import { getFinalResults } from "@/lib/utils";
import { useWindowSize } from "@uidotdev/usehooks";
import { createContext, useContext, useEffect, useState } from "react";
import Confetti from 'react-confetti'

const AppContext = createContext({});

export function AppWrapper({ children }) {
  const { toast } = useToast()

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
  const [game, setGame] = useState({
    startDate: null,
    startTime: null,
    endTime: null,
    inGameTime: 0,
    level: 1,
    isStarted: false,
    isPaused: false,
  });
  const [history, setHistory] = useState([]);

  //Initial Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Run both fetch calls concurrently
        const [playersRes, chipsRes, blindsRes, historyRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chips`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blinds`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history`)
        ]);
  
        const [playersData, chipsData, blindsData, historyData] = await Promise.all([
          playersRes.json(),
          chipsRes.json(),
          blindsRes.json(),
          historyRes.json()
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

        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  //End of the game
  useEffect(() => {
    if(game.endTime){
      console.log("settings", settings);
      console.log("game", game);
      
      // Message
      toast({
        title: "Torneo finalizado", 
        description: `Felicitaciones ${settings.players.registeredPlayers.activePlayers[0].nick}!`, 
        variant: "outline",
      })

      // Save results
      const finalResults = getFinalResults(settings, game)
      saveInfo(finalResults)
        .then(res => res.error
          ? toast({
            title: "Error!", 
            description: "Error guardando resultados",
            variant: "destructive",
          })
          :  toast({
            title: "Resultados guardados", 
            description: `Se han guardado tus resultados.`, 
            variant: "outline",
          })
        )
    }
  }, [game.endTime])

  const { width, height } = useWindowSize()
  return ( 
    <AppContext.Provider value={{settings, setSettings, history, game, setGame}}>
      <Confetti run={game.endTime ? true : false} recycle={false} numberOfPieces={10000} tweenDuration={4000} width={width} height={height} friction={0.99} />
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}