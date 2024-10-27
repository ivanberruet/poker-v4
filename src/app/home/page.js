'use client'
import React from 'react'
import { useAppContext } from '@/context';

export default function Home() {

  const {settings, setSettings} = useAppContext();
  console.log("settings", settings);

  return (
    <div>Home</div>
  )
}
