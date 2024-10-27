import React from 'react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
import Link from 'next/link'

export default function DesktopLink({href, className, icon, text}) {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Link 
                href={href}
                className={`flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8 ${className}`}
                >
                {icon}
                <span className="sr-only">{text}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-background bg-foreground">{text}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
}
