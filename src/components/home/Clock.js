'use client'
import React from 'react'
import { useMediaQuery } from '@mui/material';
import { useAppContext } from '@/context';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function Clock() {
  const {settings, game, setGame} = useAppContext();
  const timePerLevel = settings.time.timePerLevel
	const xl = useMediaQuery('(min-width:1080px)');
	const xxl = useMediaQuery('(min-width:1440px)');
	let timerWidth = xxl ? 225 : xl ? 200 : 175 
	let timerStrokeWidth = xxl ? 16 : xl ? 14 : 12

  const handleStart = () => {
    setGame((prevGame) => ({
      ...prevGame,
      isStarted: true,
      startDate: new Date().toLocaleDateString(),
      startTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    }));
		};

  const handlePause = () => {
    setGame((prevGame) => ({
      ...prevGame,
      isPaused: !prevGame.isPaused,
    }));
  };
  const handleComplete = () => {
    console.log("changing level to ", game.level+1);
    setGame((prevGame) => ({...prevGame, level: prevGame.level+1}))
  }
  const children = ({ remainingTime }) => {
		var minutes = "00"	;
		var seconds = "00";
		if(!isNaN(remainingTime)){
			minutes = Math.floor(remainingTime / 60)
			seconds = remainingTime % 60 >= 10 ? remainingTime % 60 : `0${remainingTime % 60}`
		}
			return(
				<div className='w-full flex flex-col items-center'>
					<span className='text-semibold text-white text-lg xl:text-2xl absolute top-10 2xl:top-14 m-auto'>Nivel {game.level}</span>
					<span className='mt-4 w-full text-center font-semibold text-white text-4xl xl:text-5xl'>{`${minutes}:${seconds}`}</span>
				</div>
		)
	}
  // Tiempo acumulado de juego
	const updateGameTime = () =>{
		if(game.isStarted){
			// console.log("TimeInfo - Execuiting updateGameTime");
      setGame((prevGame) => ({
        ...prevGame,
        inGameTime: prevGame.inGameTime + 1,
      }))
		}
	}

  const ClockButton = ({state, handleFunction, lavel1, lavel2}) => {
    return(
      <button
      className="text-white text-xl border border-gray-300 rounded-md px-4 py-2 shadow-md shadow-black inset-4 lg:text-2xl"
      onClick={handleFunction}
      >
        {state ? lavel1 : lavel2}
      </button>
    )
  }

  return (
    <div className={`Clock | flex flex-col gap:4 xl:gap-0`}>

    <div className="ButtonContainer | h-fit flex justify-center gap-8 pb-8">

    {game.isStarted 
      ? <ClockButton state={game.isPaused} handleFunction={handlePause} lavel1="Reanudar" lavel2="Pausar" />
      : <ClockButton state={game.isStarted} handleFunction={handleStart} lavel1="Detener" lavel2="Iniciar" />
    }
    </div>


    <div className='CountdownCircleTimer | flex justify-center'>
      <CountdownCircleTimer
        isPlaying={game.isStarted && !game.isPaused}
        // initialRemainingTime={100}
        duration={timePerLevel*60}
        // duration={5} // Para debug
        size={timerWidth}
        colors={['#1A9AEF', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[timePerLevel*60*.5, timePerLevel*60*.25, 90, 0]}
        // colorsTime={[60, 15, 5, 0]} // Para debug
        trailColor= 'rgba(0, 0, 0, 0.3)'
        strokeWidth={timerStrokeWidth}
        updateInterval={1}
        onComplete={(te)=>{
          game.isStarted ? handleComplete() : console.log(te);
          return { shouldRepeat: true, delay: 0 }
        }}
        onUpdate={(rt)=> rt !==0 ? updateGameTime() : null}
      >
        {({ remainingTime, elapsedTime }) => children({ remainingTime, elapsedTime })}
      </CountdownCircleTimer>
    </div>
  </div>
)
}
