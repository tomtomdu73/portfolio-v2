import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  id: string
  className?: string
}

const Section = ({ children, id, className }: SectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      id={id}
      style={{
        // transform: isInView ? 'none' : 'translateY(-200px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
      }}
      className={className}
    >
      {children}
    </section>
  )
}

export default Section
