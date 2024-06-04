import React from 'react'

import { InfiniteMovingCards } from './ui/InfinityCards'
import Section from './ui/Section'
import { getTestimonials } from '@/lib/sanity'

const Testimonials = async () => {
  const testimonials = await getTestimonials()
  console.log(testimonials)

  return (
    <Section id="testimonials" className="pb-20 pt-28">
      <h2 className="heading">
        Kind words from
        <span className="text-sunflower-600"> satisfied clients</span>
      </h2>

      <div className="max-lg mt-10 flex flex-col items-center">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="relative flex h-[50vh] flex-col items-center justify-center  overflow-hidden rounded-md antialiased md:h-[30rem]"
        >
          <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
        </div>
      </div>
    </Section>
  )
}

export default Testimonials
