'use client'
import * as React from "react"
import Image from "next/image";
import { Home, Info, LineChart, PanelLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui//button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui//sheet";
import { usePathname } from "next/navigation";
import DesktopLink from "./DesktopLink";
import MobileLink from "./MobileLink";

export default function Navigation({ children }) {

  const pathName = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-accent-foreground">

      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-muted bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Image src="/logo.png" alt="Logo" width={25} height={25} className="hidden sm:block"></Image>

          <DesktopLink href="/" icon={<Home className="h-5 w-5" />} text="Inicio" className={pathName === "/" ? "bg-accent text-foreground " : "text-muted-foreground"} />

          <DesktopLink href="/info" icon={<Info className="h-5 w-5" />} text="Información" className={pathName === "/info" ? "bg-accent text-foreground " : "text-muted-foreground"} />

          <DesktopLink href="/stats" icon={<LineChart className="h-5 w-5" />} text="Estadísticas" className={pathName === "/stats" ? "bg-accent text-foreground " : "text-muted-foreground"} />

          <DesktopLink href="/settings" icon={<Settings className="h-5 w-5" />} text="Configuración" className={pathName === "/settings" ? "bg-accent text-foreground " : "text-muted-foreground"} />

        </nav>

      </aside>
      
      {/* Mobile */}
      <div className="flex flex-col sm:gap-4 sm:hidden">
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

                <MobileLink href="/" icon={<Home className="h-5 w-5" />} text="Inicio" className={pathName === "/" ? "text-foreground " : "text-muted-foreground"} />

                <MobileLink href="/info" icon={<Info className="h-5 w-5" />} text="Información" className={pathName === "/info" ? "text-foreground " : "text-muted-foreground"} />

                <MobileLink href="/stats" icon={<LineChart className="h-5 w-5" />} text="Estadísticas" className={pathName === "/stats" ? "text-foreground " : "text-muted-foreground"} />

                <MobileLink href="/settings" icon={<Settings className="h-5 w-5" />} text="Configuración" className={pathName === "/settings" ? "text-foreground " : "text-muted-foreground"} />

              </nav>
            </SheetContent>
          </Sheet>

          <Image src="/logo.png" alt="Logo" width={30} height={30}></Image>
        </header>
      </div>

      <main className="flex min-h-screen flex-col items-center justify-between bg-background sm:pl-[55px]">
        {children}
      </main>
    </div>  
  )
}
