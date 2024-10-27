import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {Home,Info,LineChart,PanelLeft,Settings} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/tooltip"


export default function TestComponent({children}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-accent-foreground">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-muted border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Inicio</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-background bg-foreground">Inicio</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Info className="h-5 w-5" />
                <span className="sr-only">Información</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-background bg-foreground">Información</TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Estadísticas</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-background bg-foreground">Estadísticas</TooltipContent>
          </Tooltip>
          </TooltipProvider>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Configuración</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-background bg-foreground">Configuración</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:hidden">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-muted bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs text-accent-foreground">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Inicio
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Info className="h-5 w-5" />
                  Info
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Estadísticas
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Configuración
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Image src="/logo.png" alt="Logo" width={30} height={30} className="sm:hidden"></Image>
        </header>
      </div>

      {children}
    </div>  
  )
}
