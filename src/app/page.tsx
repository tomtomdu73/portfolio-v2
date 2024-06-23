'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import Flip from 'gsap/Flip'
import { getMousePos, lerp } from '@/utils/motion.js'
import BackgroundImages from '@/components/BackgroundImages'

gsap.registerPlugin(Flip)

const TestPage = () => {
  const frameRef = useRef(null)
  const contentRef = useRef(null)
  const enterButtonRef = useRef(null)
  const fullviewRef = useRef(null)
  const gridRef = useRef(null)

  const [winsize, setWinsize] = useState({ width: window.innerWidth, height: window.innerHeight })
  const [mousepos, setMousepos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const [renderedStyles, setRenderedStyles] = useState([])
  const [requestId, setRequestId] = useState<number | null>(null)

  const config = {
    translateX: true,
    skewX: false,
    contrast: true,
    scale: false,
    brightness: true,
  }

  useEffect(() => {
    const handleResize = () => {
      setWinsize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (ev: MouseEvent) => {
      const pos = getMousePos(ev)
      setMousepos(pos)
    }

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0]
      handleMouseMove(touch)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  useEffect(() => {
    const gridRows = gridRef.current.querySelectorAll('.row')
    const numRows = gridRows.length

    const middleRowIndex = Math.floor(numRows / 2)
    const middleRow = gridRows[middleRowIndex]
    const middleRowItems = middleRow.querySelectorAll('.row__item')
    const numRowItems = middleRowItems.length
    const middleRowItemIndex = Math.floor(numRowItems / 2)
    const middleRowItemInner = middleRowItems[middleRowItemIndex].querySelector('.row__item-inner')
    const middleRowItemInnerImage = middleRowItemInner.querySelector('.row__item-img')
    middleRowItemInnerImage.classList.add('row__item-img--large')

    const baseAmt = 0.1
    const minAmt = 0.05
    const maxAmt = 0.1

    const config = {
      translateX: true,
      skewX: false,
      contrast: true,
      scale: false,
      brightness: true,
    }

    const newRenderedStyles = Array.from({ length: numRows }, (v, index) => {
      const distanceFromMiddle = Math.abs(index - middleRowIndex)
      const amt = Math.max(baseAmt - distanceFromMiddle * 0.03, minAmt)
      const scaleAmt = Math.min(baseAmt + distanceFromMiddle * 0.03, maxAmt)
      let style = {}

      if (config.translateX) {
        style.translateX = { previous: 0, current: 0 }
      }
      if (config.skewX) {
        style.skewX = { previous: 0, current: 0 }
      }
      if (config.contrast) {
        style.contrast = { previous: 100, current: 100 }
      }
      if (config.scale) {
        style.scale = { previous: 1, current: 1 }
      }
      if (config.brightness) {
        style.brightness = { previous: 100, current: 100 }
      }

      return {
        ...style,
        amt,
        scaleAmt,
      }
    })
    console.log('initialRenderedStyle', newRenderedStyles)
    setRenderedStyles(newRenderedStyles)
  }, [])

  useEffect(() => {
    const calculateMappedX = () => {
      return (((mousepos.x / winsize.width) * 2 - 1) * 40 * winsize.width) / 100
    }

    const calculateMappedSkew = () => {
      return ((mousepos.x / winsize.width) * 2 - 1) * 3
    }

    const calculateMappedContrast = () => {
      const centerContrast = 100
      const edgeContrast = 330
      const t = Math.abs((mousepos.x / winsize.width) * 2 - 1)
      const factor = Math.pow(t, 2)
      return centerContrast - factor * (centerContrast - edgeContrast)
    }

    const calculateMappedScale = () => {
      const centerScale = 1
      const edgeScale = 0.95
      return (
        centerScale - Math.abs((mousepos.x / winsize.width) * 2 - 1) * (centerScale - edgeScale)
      )
    }

    const calculateMappedBrightness = () => {
      const centerBrightness = 100
      const edgeBrightness = 15
      const t = Math.abs((mousepos.x / winsize.width) * 2 - 1)
      const factor = Math.pow(t, 2)
      return centerBrightness - factor * (centerBrightness - edgeBrightness)
    }

    const render = () => {
      const mappedValues = {
        translateX: calculateMappedX(),
        skewX: calculateMappedSkew(),
        contrast: calculateMappedContrast(),
        scale: calculateMappedScale(),
        brightness: calculateMappedBrightness(),
      }

      const gridRows = gridRef.current.querySelectorAll('.row')
      gridRows.forEach((row, index) => {
        const style = renderedStyles[index]
        for (let prop in config) {
          if (config[prop]) {
            style[prop].current = mappedValues[prop]
            const amt = prop === 'scale' ? style.scaleAmt : style.amt
            style[prop].previous = lerp(style[prop].previous, style[prop].current, amt)
          }
        }

        let gsapSettings = {}
        if (config.translateX) gsapSettings.x = style.translateX.previous
        if (config.skewX) gsapSettings.skewX = style.skewX.previous
        if (config.scale) gsapSettings.scale = style.scale.previous
        if (config.contrast) gsapSettings.filter = `contrast(${style.contrast.previous}%)`
        if (config.brightness)
          gsapSettings.filter = `${gsapSettings.filter ? gsapSettings.filter + ' ' : ''}brightness(${style.brightness.previous}%)`

        gsap.set(row, gsapSettings)
      })

      setRequestId(requestAnimationFrame(render))
    }

    const startRendering = () => {
      if (!requestId && gridRef.current && renderedStyles.length > 0) {
        render()
      }
    }

    const stopRendering = () => {
      if (requestId) {
        cancelAnimationFrame(requestId)
        setRequestId(null)
      }
    }

    startRendering()

    return () => stopRendering()
  }, [winsize, mousepos, renderedStyles, requestId])

  const enterFullview = () => {
    const gridRows = gridRef.current.querySelectorAll('.row')
    const numRows = gridRows.length
    const middleRowIndex = Math.floor(numRows / 2)
    const middleRow = gridRows[middleRowIndex]
    const middleRowItems = middleRow.querySelectorAll('.row__item')
    const numRowItems = middleRowItems.length
    const middleRowItemIndex = Math.floor(numRowItems / 2)
    const middleRowItemInner = middleRowItems[middleRowItemIndex].querySelector('.row__item-inner')
    const middleRowItemInnerImage = middleRowItemInner.querySelector('.row__item-img')

    const flipstate = Flip.getState(middleRowItemInner)
    fullviewRef.current.appendChild(middleRowItemInner)

    const transContent = getComputedStyle(contentRef.current)
      .getPropertyValue('--trans-content')
      .trim()

    const tl = gsap.timeline()
    tl.add(
      Flip.from(flipstate, {
        duration: 0.9,
        ease: 'power4',
        absolute: true,
        onComplete: () => setRequestId(null),
      })
    )
      .to(
        gridRef.current,
        {
          duration: 0.9,
          ease: 'power4',
          opacity: 0.01,
        },
        0
      )
      .to(
        middleRowItemInnerImage,
        {
          scale: 1.2,
          duration: 1.6,
          ease: 'sine',
        },
        '<-=0.45'
      )
      .to(contentRef.current, {
        y: transContent,
        duration: 0.9,
        ease: 'power4',
      })
      .to(
        middleRowItemInnerImage,
        {
          scale: 1.1,
          startAt: { filter: 'brightness(100%)' },
          filter: 'brightness(50%)',
          y: '-5vh',
          duration: 0.9,
          ease: 'power4',
        },
        '<'
      )

    enterButtonRef.current.classList.add('hidden')
    frameRef.current.classList.remove('noscroll')
  }

  return (
    <div className="noscroll loading" ref={frameRef}>
      <header className="frame">
        <h1 className="frame__title">
          Thomas <strong>COSIALLS</strong>
        </h1>
      </header>
      <section className="intro">
        <div className="grid" ref={gridRef}>
          <BackgroundImages />
        </div>
        <div className="fullview" ref={fullviewRef}></div>
        <div className="enter !text-white" ref={enterButtonRef} onClick={enterFullview}>
          <span>Enter my portfolio</span>
        </div>
      </section>
      <section className="content" ref={contentRef}>
        <nav className="content__nav">
          <a
            className="content__nav-item"
            href="https://tympanus.net/codrops/?p=77934"
            target="_blank"
          >
            LINKEDIN
          </a>
          <a
            className="content__nav-item"
            href="https://github.com/codrops/IntroGridMotionTransition"
            target="_blank"
          >
            GitHub
          </a>
          <a
            className="content__nav-item"
            href="https://github.com/codrops/IntroGridMotionTransition"
            target="_blank"
          >
            AGENCY
          </a>
          <a className="content__nav-item" href="https://tympanus.net/codrops/demos/">
            Explore all demos &rarr;
          </a>
        </nav>
        <div className="content__header">
          <h2>Welcome</h2>
        </div>
        <div className="content__text">
          <p className="right">
            At <strong>Nova</strong>Motion&reg;, our team of creative artists and tech experts work
            together to explore new possibilities. Each project shows our dedication to new ideas
            and high quality, whether it's a commercial, film, or interactive display.
          </p>
          <p className="highlight">
            We believe motion design can tell stories, evoke emotions, and inspire imaginations.
          </p>
          <p>
            Our clients are at the core of everything we do at <strong>Nova</strong>Motion&reg;. We
            pride ourselves on building strong, lasting relationships based on trust, communication,
            and mutual respect. We listen carefully to your needs and goals, ensuring we fully
            understand your vision.{' '}
          </p>
          <p>
            By collaborating closely, we tailor our approach to meet your unique requirements,
            delivering results that exceed expectations. Whether you are a small business or a large
            corporation, we are committed to helping you succeed. With <strong>Nova</strong>
            Motion&reg;, you are not just a client; you are a valued partner in creating exceptional
            visual stories.
          </p>
        </div>
        <footer className="content__footer">
          <span>
            Made by <a href="https://www.instagram.com/codropsss/">@codrops</a>
          </span>
          <a href="https://tympanus.net/codrops/collective/">Subscribe to our frontend news</a>
        </footer>
      </section>
    </div>
  )
}

export default TestPage
