'use client'
import Loading from "./Loading";
import Home from "./home/page";
import { useAppContext } from '@/context'

export default function page() {

  const {settings} = useAppContext();

  return (
    settings.isLoading ? <Loading /> : <Home />  
);
}