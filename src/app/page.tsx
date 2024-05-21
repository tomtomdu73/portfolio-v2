'use client'

import Grid from '@/components/Grid'
import Hero from '@/components/Hero'

// import Footer from "@/components/Footer";
// import Clients from "@/components/Clients";
// import Approach from "@/components/Approach";
// import Experience from "@/components/Experience";
// import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from '@/components/ui/FloatingNavbar'

export const navItems = [
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Testimonials', link: '#testimonials' },
  { name: 'Contact', link: '#contact' },
]

const Home = () => {
  return (
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-hidden bg-zinc-50/30">
      <div className="w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <div className="mx-auto max-w-7xl px-5 sm:px-10 ">
          <Grid />
        </div>
      </div>
    </main>
  )
}

export default Home
