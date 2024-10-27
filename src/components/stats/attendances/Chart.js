"use client"
import { aggregateHistoryByDate, getPlayersStats } from "@/lib/utils";
import { useMediaQuery } from "@mui/material";
import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";



export default function AttendacesChart({history}) {
    const sm = useMediaQuery('(min-width:640px)');
    
   
    const chartRef = useRef(null)

    useEffect(() => {
        const dataset = aggregateHistoryByDate(history);
    
        const playersStats = getPlayersStats(dataset);
        
        // Date format for chart
        const data = {
            labels: dataset.map(row => new Date(row.date).toLocaleDateString("es-ES", { month: "short" }).toUpperCase() + " " + new Date(row.date).getFullYear().toString().substring(2)),
            datasets: [
                {
                    label: "Jugadores",
                    data: dataset.map(row => row.players),
                    borderWidth: 2,
                    borderRadius: 8,
                    backgroundColor: "hsl(220 70% 50%)",
                }
            ]
        }
    
        // Chart
        if(chartRef.current) {
            if(chartRef.current.chart) {
                chartRef.current.chart.destroy()
            }
    
            const context = chartRef.current.getContext("2d");
            const newChart = new Chart(context,{
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 2,
                    scales: {
                        x: {
                            grid:{
                                display: false
                            },
                            ticks:{
                                minRotation: 45,
                                // autoSkip: false
                            }
                        },
                        y: {
                            grid:{
                                color: 'hsl(240 3.7% 15.9%)',
                                drawTicks: false,
                            },
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: "Asistencias por torneo",
                            color: 'white',
                            align: 'start',
                            padding: {bottom: 20},
                            font:{size: sm ? 30 : 24}
                        },
                        subtitle: {
                            display: true,
                            text: playersStats.map(stat => `${stat.title}: ${stat.value}`).join(' | '),
                            color: 'white',
                            align: 'center',
                            padding: {bottom: 20},
                            font:{size: sm ? 20 : 12}
                        },
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks:{
                                title: (context) => {
                                    const date = new Date(dataset[context[0].dataIndex].date)
                                    let day = date.toLocaleDateString("es-ES", { day: "numeric" })
                                    let month = date.toLocaleDateString("es-ES", { month: "long" })
                                    month = month.charAt(0).toUpperCase() + month.slice(1);
                                    let year = date.getFullYear()
    
                                    return `${day} de ${month} de ${year}`
                                }
                            }
                        }
                    },
                    layout: {
                        padding: 24
                    }
                }
            });
    
            chartRef.current.chart = newChart
        }
        // logs
        // console.log("dataset", dataset);
    },[])

    
  return (
    <div className="w-full flex flex-col">
        
        <div className="Attendances |!relative h-[20rem] sm:h-[auto] sm:max-w-[60%] ">
            <canvas ref={chartRef}  className=" h-full w-full border border-muted rounded-xl" />
        </div>
    </div>
  )
}
