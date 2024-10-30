'use client'
import { useAppContext } from '@/context';
import React from 'react'
import Blinds from './Blinds';
import Clock from './Clock';

export default function Game() {
  const {settings, game} = useAppContext();
  const currentLevel = game.level
  
  return (
    <section className='gridItem isolate bg-muted/20 shadow-lg rounded-xl p-6 lg:col-span-3 w-full flex flex-col lg:flex-row justify-around gap-6 lg:gap-0'>
      <Blinds level={currentLevel-1} status={"current"} structure={settings.structure} />
      <Clock />
      <Blinds level={currentLevel} status={"next"} structure={settings.structure} />
    </section>
  )
}
