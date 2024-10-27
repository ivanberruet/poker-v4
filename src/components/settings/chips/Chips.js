import React from 'react'
import AvailableChips from './AvailableChips'
import ChipsDristribution from './ChipsDristribution'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function Chips() {
  return (
      <Accordion type="multiple" collapsible="true" className="w-[50%] flex flex-col gap-6" defaultValue={["item-1", "item-2"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">Fichas disponibles</AccordionTrigger>
          <AccordionContent>
            <AvailableChips />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl">Distribución</AccordionTrigger>
          <AccordionContent>
            <ChipsDristribution />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  )
}
