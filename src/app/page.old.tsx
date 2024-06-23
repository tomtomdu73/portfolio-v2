'use client'

import Testimonials from '@/components/Testimonials'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Hero from '@/components/Hero'
import RecentProjects from '@/components/RecentProjects'
import { FloatingNav } from '@/components/ui/FloatingNavbar'
import { Products } from '@/components/Products'

export const navItems = [
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Experience', link: '#experience' },
  { name: 'Testimonials', link: '#testimonials' },
  { name: 'Contact', link: '#contact' },
]

const Home = () => {
  return (
    <main className="relative mx-auto overflow-hidden bg-zinc-50/30 dark:bg-black">
      <div className="w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        {/* <Products /> */}
        <div className="mx-auto max-w-7xl px-5 sm:px-10 ">
          <About />
          <RecentProjects />
          <Products />
          <Experience />
          <Testimonials />
          <Footer />
        </div>
      </div>
    </main>
  )
}

export default Home
