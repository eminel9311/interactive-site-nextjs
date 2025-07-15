'use client'

import dynamic from 'next/dynamic'

const Experience = dynamic(() => import('@/canvas/Experience'), { ssr: false })

export default function HomePageClient() {
  return (
    <main className="relative z-0 bg-primary">
      <Experience />
    </main>
  )
}
