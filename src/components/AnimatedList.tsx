'use client'

import React, { useEffect, useRef } from 'react'
import { TextAnimator } from '@/utils/text-animator'

import '@/styles/list-hover.css'
import { ClientType } from '@/lib/sanity'

export default function AnimatedList({ items }: { items: ClientType[] }) {
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
    <section className="animated-list-section">
      <ul className="list">
        {items.map((item) => (
          <li
            className="list__item"
            ref={(el) => el && listItemRefs.current.push(el)}
            key={item.id}
          >
            <span className="list__item-col hover-effect hover-effect--bg-south">{item.title}</span>
            <span className="list__item-col hover-effect hover-effect--bg-south">
              {item.description}
            </span>
            <span className="list__item-col hover-effect hover-effect--bg-south">
              {item.endDate}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
