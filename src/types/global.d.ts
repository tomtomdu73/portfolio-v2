declare interface RenderedStyleProps {
  translateX: { previous: number; current: number }
  skewX: { previous: number; current: number }
  contrast: { previous: number; current: number }
  scale: { previous: number; current: number }
  brightness: { previous: number; current: number }
  amt: number
  scaleAmt: number
}

declare interface GsapSettingProps {
  x: number
  skewX: number
  scale: number
  filter: string
}
