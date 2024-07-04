'use client'

import React, { useEffect, useRef } from 'react'
import moment from 'moment'

import '@/styles/list-hover.css'
import { BaseEntryType } from '@/lib/sanity'
import { TextAnimator } from '@/utils/text-animator'
import ExternalLink from './ui/ExternalLink'

export interface AnimatedListProps {
  items: BaseEntryType[]
  withVideo?: boolean
  withDate?: boolean
  isExperience?: boolean
}

function Separator({ variant = 'small' }: { variant?: 'small' | 'large' }) {
  return <span className={`${variant == 'small' ? 'text-2xl' : 'text-4xl'} font-light`}>|</span>
}

export default function AnimatedList({
  items,
  withVideo = false,
  withDate = false,
  isExperience = false,
}: AnimatedListProps) {
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null)

  const listItemRefs = useRef([])
  const linkRefs = useRef([])

  useEffect(() => {
    // Add event listeners to list items
    listItemRefs.current.forEach((item) => {
      const cols = Array.from(item.querySelectorAll('.hover-effect'))
      const animators = cols.map((col) => new TextAnimator(col))

      const handleMouseEnter = () => {
        animators.forEach((animator) => animator.animate())
      }

      const handleMouseLeave = () => {
        animators.forEach((animator) => animator.animateBack())
      }

      item.addEventListener('mouseenter', handleMouseEnter)
      item.addEventListener('mouseleave', handleMouseLeave)

      // Cleanup function to remove event listeners
      return () => {
        item.removeEventListener('mouseenter', handleMouseEnter)
        item.removeEventListener('mouseleave', handleMouseLeave)
      }
    })

    // Add event listeners to links
    linkRefs.current.forEach((item) => {
      const animator = new TextAnimator(item)

      const handleMouseEnter = () => {
        animator.animate()
      }

      const handleMouseLeave = () => {
        animator.animateBack()
      }

      item.addEventListener('mouseenter', handleMouseEnter)
      item.addEventListener('mouseleave', handleMouseLeave)

      // Cleanup function to remove event listeners
      return () => {
        item.removeEventListener('mouseenter', handleMouseEnter)
        item.removeEventListener('mouseleave', handleMouseLeave)
      }
    })
  }, [])

  return (
    <section className="my-10">
      {withVideo && selectedVideo && (
        <iframe
          width="560"
          height="315"
          src={selectedVideo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      <ul className="flex list-none flex-col justify-center gap-8 sm:gap-4">
        {items.map((item) => (
          <li
            className="group z-50 flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-end"
            ref={(el) => el && listItemRefs.current.push(el)}
            key={item.id}
          >
            <span className="list__item-col hover-effect hover-effect--bg-south text-wrap text-3xl font-medium sm:text-6xl">
              {item.title}
            </span>

            {withDate && (
              <>
                <Separator />

                <span className="text-3xl font-light">
                  {item.startDate && moment(item.startDate).format('YYYY') + ' - '}
                  {item.endDate && moment(item.endDate).format('YYYY')}
                </span>
              </>
            )}
            <Separator />
            {isExperience ? (
              <>
                <span className="text-center text-3xl sm:text-right">{item.company}</span>
                <Separator />
                <span className="text-center text-3xl sm:text-right">{item.location}</span>
              </>
            ) : (
              <span className="text-center text-3xl sm:text-right">{item.description}</span>
            )}

            {item.externalUrl && (
              <>
                <Separator />
                <nav className="my-4 flex justify-center text-xl group-hover:animate-bounce">
                  <ExternalLink title="Visit" url={item.externalUrl} />
                </nav>
              </>
            )}
            {withVideo && (
              <>
                <Separator />
                <button
                  onClick={() => setSelectedVideo('https://www.youtube.com/embed/tgbNymZ7vqY')}
                >
                  Play
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
