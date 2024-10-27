import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

export default function StatsCard({stats}) {
    console.log("stats", stats);
    
  return (
    <Card className="w-fit pr-24 border-muted">
        <CardContent className="flex flex-col gap-4 p-4">
        <div className="grid flex-1 auto-rows-min gap-1">
            <div className="text-sm text-muted-foreground">Torneos disputados</div>
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                {stats.totalTournaments}
            </div>
        </div>
        <div className="grid flex-1 auto-rows-min gap-1">
            <div className="text-sm text-muted-foreground">Duración promedio</div>
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
            {Math.floor(stats.averageLength)} h {Math.floor((stats.averageLength - Math.floor(stats.averageLength)) * 60)} m
            </div>
        </div>
        </CardContent>
    </Card>
    )
}
