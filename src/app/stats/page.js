import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import Attendances from "@/components/stats/attendances/Attendances"
import History from "@/components/stats/history/History"
import Players from "@/components/stats/players/Players"
import Podiums from "@/components/stats/podiums/Podiums"

export default function page() {

  return (
    <section className="w-full h-full flex-col">
      <div className="w-full flex flex-col gap-4 p-6 sm:py-10">
          <Tabs defaultValue="Attendances" className="w-full">
                  <TabsList className="w-fit text-white flex gap-4 p-1 bg-muted rounded-xl mb-4 text-xs sm:text-xl">
                      <TabsTrigger value="Attendances" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Asistencias</TabsTrigger>
                  <TabsTrigger value="History" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Historial</TabsTrigger>
                  <TabsTrigger value="Podiums" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Podios</TabsTrigger>
                  <TabsTrigger value="Players" className="px-2 py-1 rounded-lg data-[state=inactive]:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">Jugadores</TabsTrigger>
              </TabsList>

              <TabsContent value="Attendances"><Attendances /></TabsContent>
              <TabsContent value="History"><History /></TabsContent>
              <TabsContent value="Podiums"><Podiums /></TabsContent>
              <TabsContent value="Players"><Players /></TabsContent>
          </Tabs>    
      </div>
    </section>
  )
}

