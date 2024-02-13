import HomeHeader from '@/components/home/header'
import { HeroSection } from '@/components/home/hero'
import Image from 'next/image'

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
        <HomeHeader />
        <HeroSection />
    </main>
  )
}
