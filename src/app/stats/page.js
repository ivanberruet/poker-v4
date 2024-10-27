import React, { Suspense } from 'react'
import Stats from './Stats'
import Loading from '../Loading'

export default function page() {

  return (
    <section className="w-full h-full flex-col">
      <Suspense fallback={<Loading />}>
        <Stats />  
      </Suspense>  
    </section>
  )
}

