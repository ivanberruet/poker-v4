import React from 'react'
import Link from 'next/link'
import { SheetTrigger } from '../ui/sheet'

export default function MobileLink({ href, icon, text, className }) {
  return (
    <SheetTrigger asChild>
        <Link
            href={href}
            className={`flex items-center gap-4 px-2.5 hover:text-foreground ${className}`}
        >
            {icon}
            {text}
        </Link>
    </SheetTrigger>
)
}
