import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import Attendances from "@/components/stats/attendances/Attendances"
import History from "@/components/stats/history/History"
import Players from "@/components/stats/players/Players"
import Podiums from "@/components/stats/podiums/Podiums"

async function getHistory(){
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history`)
        let data = await res.json()
        
        return data
    } catch (error) {
        console.log(error)
      }
}

export default async function Stats() {
  
    const [ history ] = await Promise.all([
        getHistory(),
    ])

  return (
    <div className="w-full flex flex-col gap-4 p-6 sm:py-10">
        <Tabs defaultValue="Attendances" className="w-full">
             <TabsList className="w-fit text-white flex gap-4 p-1 bg-muted rounded-xl mb-4 text-xs sm:text-xl">
                 <TabsTrigger value="Attendances" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Asistencias</TabsTrigger>
                <TabsTrigger value="History" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Historial</TabsTrigger>
                <TabsTrigger value="Podiums" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Podios</TabsTrigger>
                <TabsTrigger value="Players" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Jugadores</TabsTrigger>
            </TabsList>

            <TabsContent value="Attendances"><Attendances history={history} /></TabsContent>
            <TabsContent value="History"><History history={history} /></TabsContent>
            <TabsContent value="Podiums"><Podiums history={history} /></TabsContent>
            <TabsContent value="Players"><Players history={history} /></TabsContent>
            
        </Tabs>    
    </div>
  )
}
