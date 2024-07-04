'use client'

import React from 'react'
import AnimatedCursor from 'react-animated-cursor'

import useDeviceDetection from '@/hooks/useDeviceDetection'

const CustomCursor = () => {
  const device = useDeviceDetection()

  return (
    device == 'Desktop' && (
      <AnimatedCursor
        innerSize={15}
        outerSize={15}
        color="247, 212, 136"
        outerAlpha={0.4}
        innerScale={0.7}
        outerScale={5}
      />
    )
  )
}

export default CustomCursor
