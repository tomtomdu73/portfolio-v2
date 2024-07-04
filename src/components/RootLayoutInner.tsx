'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Flip from 'gsap/Flip'

import BackgroundImages from '@/components/BackgroundImages'
import { getMousePos, lerp } from '@/utils/motion'
import CustomCursor from './CustomCursor'

gsap.registerPlugin(Flip)

const gridConfig = {
  translateX: true,
  skewX: false,
  contrast: true,
  scale: false,
  brightness: true,
}

export function RootLayoutInner({ children }: { children: React.ReactNode }) {
  const frameRef = useRef(null)
  const contentRef = useRef(null)
  const enterButtonRef = useRef(null)
  const fullviewRef = useRef(null)
  const gridRef = useRef(null)

  const [winsize, setWinsize] = useState<{ width: number; height: number }>()
  const [mousepos, setMousepos] = useState<{ x: number; y: number }>()
  const [renderedStyles, setRenderedStyles] = useState<RenderedStyleProps[]>([])
  const [requestId, setRequestId] = useState<number | null>(null)

  useEffect(() => {
    setWinsize({ width: window.innerWidth, height: window.innerHeight })
    setMousepos({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  }, [])

  /* Update cursor position and window size */
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

  /* Init rendered style */
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
    // middleRowItemInnerImage.classList.add('row__item-img--large')

    const baseAmt = 0.1
    const minAmt = 0.05
    const maxAmt = 0.5

    const newRenderedStyles = Array.from({ length: numRows }, (v, index) => {
      const distanceFromMiddle = Math.abs(index - middleRowIndex)
      const amt = Math.max(baseAmt - distanceFromMiddle * 0.03, minAmt)
      const scaleAmt = Math.min(baseAmt + distanceFromMiddle * 0.03, maxAmt)
      let style = {} as RenderedStyleProps

      if (gridConfig.translateX) {
        style.translateX = { previous: 0, current: 0 }
      }
      if (gridConfig.skewX) {
        style.skewX = { previous: 0, current: 0 }
      }
      if (gridConfig.contrast) {
        style.contrast = { previous: 100, current: 100 }
      }
      if (gridConfig.scale) {
        style.scale = { previous: 1, current: 1 }
      }
      if (gridConfig.brightness) {
        style.brightness = { previous: 100, current: 100 }
      }

      return {
        ...style,
        amt,
        scaleAmt,
      }
    })
    setRenderedStyles(newRenderedStyles)
  }, [])

  /* Animate background images */
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
        for (let prop in gridConfig) {
          if (gridConfig[prop]) {
            style[prop].current = mappedValues[prop]
            const amt = prop === 'scale' ? style.scaleAmt : style.amt
            style[prop].previous = lerp(style[prop].previous, style[prop].current, amt)
          }
        }

        let gsapSettings = {} as GsapSettingProps
        if (gridConfig.translateX) gsapSettings.x = style.translateX.previous
        if (gridConfig.skewX) gsapSettings.skewX = style.skewX.previous
        if (gridConfig.scale) gsapSettings.scale = style.scale.previous
        if (gridConfig.contrast) gsapSettings.filter = `contrast(${style.contrast.previous}%)`
        if (gridConfig.brightness)
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

  /* Transition to fullview */
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
    <>
      <CustomCursor />
      <div className="noscroll loading" ref={frameRef}>
        <header className="absolute z-[100] m-4 cursor-pointer rounded-xl bg-black-100 p-8 text-xl text-brand">
          <h1 onClick={() => location.reload()}>
            <strong>Thomas COSIALLS</strong> | Portfolio
          </h1>
        </header>
        <section className="intro">
          <div className="grid" ref={gridRef}>
            <BackgroundImages />
          </div>
          <div className="fullview" ref={fullviewRef}></div>
          <div
            className="absolute z-[100] cursor-pointer"
            ref={enterButtonRef}
            onClick={enterFullview}
          >
            <button className="rounded-xl bg-brand p-5 text-xl font-bold uppercase text-black-100 ring-brand transition-all duration-200 ease-in-out hover:bg-black-100 hover:text-white">
              Click to enter
            </button>
          </div>
        </section>
        <section className="content" ref={contentRef}>
          {children}
        </section>
      </div>
    </>
  )
}
