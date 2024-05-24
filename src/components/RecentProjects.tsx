'use client'

import { projects } from '@/data'
import { EvervaultCard } from './ui/EvervaultCard'
import Section from './ui/Section'
import CornerIcons from './ui/CornerIcons'

const RecentProjects = () => {
  return (
    <Section id="projects" className="w-full py-20">
      <h2 className="heading">
        A small selection of <span className="text-sunflower-600">recent projects</span>
      </h2>
      <div className="mt-20 flex flex-wrap items-center justify-center gap-6">
        {projects.map((item, key) => (
          <div
            key={key}
            className="relative mx-auto flex h-[30rem] max-w-sm flex-col items-start border border-black/[0.2] p-4 dark:border-white/[0.2]"
          >
            <CornerIcons />

            <EvervaultCard text="hover" />

            <h2 className="mt-4 text-sm font-light text-black dark:text-white">
              Hover over this card to reveal an awesome effect. Running out of copy here.
            </h2>
            <p className="mt-4 rounded-full border border-black/[0.2] px-2 py-0.5 text-sm font-light text-black dark:border-white/[0.2] dark:text-white">
              Watch me hover
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default RecentProjects
