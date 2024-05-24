import React, { useRef } from 'react'

import { workExperience } from '@/data'
import Section from './ui/Section'
import { TracingBeam } from './ui/TracingBeam'
import CornerIcons from './ui/CornerIcons'
import { useInView } from 'framer-motion'

interface ExperienceItemProps {
  key: number
  item: {
    title: string
    description: JSX.Element
    badge: string
    image: string
  }
}

const ExperienceItem = ({ key, item }: ExperienceItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div
      ref={ref}
      key={key}
      className=" relative flex flex-col items-start border border-black/[0.2] p-4 odd:mr-20 even:ml-20 dark:border-white/[0.2]"
      style={{
        transform: isInView ? 'none' : 'translateX(-200px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
      }}
    >
      <CornerIcons />
      <h2 className="mb-4 w-fit bg-black px-4 py-1 text-sm text-white">{item.badge}</h2>

      <p className="mb-4 text-xl">{item.title}</p>

      <div className="prose  prose-sm dark:prose-invert text-sm">
        {/* {item?.image && (
                  <Image
                    src={item.image}
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="mb-10 rounded-lg object-cover"
                  />
                )} */}
        {item.description}
      </div>
    </div>
  )
}

const Experience = () => {
  return (
    <Section id="experience" className="w-full py-20">
      <h2 className="heading">
        My <span className="text-sunflower-600">work experience</span>
      </h2>
      <div className="mt-20 flex items-center justify-center">
        <TracingBeam>
          <div className="relative mx-auto flex max-w-2xl flex-col space-y-6 pt-4 antialiased">
            {workExperience.map((item, index) => (
              <ExperienceItem key={index} item={item} />
            ))}
          </div>
        </TracingBeam>
      </div>
    </Section>
  )
}

export default Experience
