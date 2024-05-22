'use client'

import { projects } from '@/data'
import { EvervaultCard, Icon } from './ui/EvervaultCard'
import Section from './ui/Section'

const RecentProjects = () => {
  return (
    <Section id="projects">
      <div className="w-full py-20">
        <h2 className="heading">
          A small selection of <span className="text-sunflower-600">recent projects</span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {projects.map((item, key) => (
            <div
              key={key}
              className="relative mx-auto flex h-[30rem] max-w-sm flex-col items-start border border-black/[0.2] p-4 dark:border-white/[0.2]"
            >
              <Icon className="absolute -left-3 -top-3 h-6 w-6 text-black dark:text-white" />
              <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white" />
              <Icon className="absolute -right-3 -top-3 h-6 w-6 text-black dark:text-white" />
              <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white" />

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
      </div>
    </Section>
  )
}

export default RecentProjects
