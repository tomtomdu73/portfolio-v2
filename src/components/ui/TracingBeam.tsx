'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useScroll, useSpring } from 'framer-motion'

import { cn } from '@/utils/cn'

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [100, svgHeight]), {
    stiffness: 500,
    damping: 90,
  })
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  })

  return (
    <motion.div ref={ref} className={cn('relative mx-auto h-full w-full max-w-4xl', className)}>
      <div className="absolute -left-4 top-3 hidden sm:block md:-left-10">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          className="bg-sunflower-600 ml-[27px] flex h-4 w-4 items-center justify-center"
        ></motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} // Set the SVG height
          className=" ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0 V -36 l 18 24 V ${svgHeight * 0.01} l -18 24  V ${svgHeight * 0.3} l 18 24 V ${svgHeight * 0.5} l -18 24 V ${svgHeight * 0.8} l 18 24 V ${svgHeight}`}
            fill="none"
            stroke="#4c4c4c"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0 V -36 l 18 24 V ${svgHeight * 0.3} l -18 24 V ${svgHeight * 0.5} l 18 24 V ${svgHeight * 0.8} l -18 24 V ${svgHeight * 0.95} l 18 24 V ${svgHeight} `}
            fill="none"
            stroke="#4c4c4c"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0 V -36 l 18 24 V ${svgHeight * 0.3} l -18 24 V ${svgHeight * 0.5} l 18 24 V ${svgHeight * 0.8} l -18 24 V ${svgHeight * 0.95} l 18 24 V ${svgHeight} `}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1} // set y1 for gradient
              y2={y2} // set y2 for gradient
            >
              <stop stopColor="#fbfb49" stopOpacity="0"></stop>
              <stop stopColor="#fbfb49"></stop>
              <stop offset="0.325" stopColor="#c8a806"></stop>
              <stop offset="1" stopColor="#704e13" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          className="bg-sunflower-500 ml-[27px] flex h-4 w-4 items-center justify-center"
        ></motion.div>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}
