export interface LayoutTemplate {
  id: string
  name: string
  description: string
  imagePosition: 'top' | 'middle' | 'bottom' | 'full' | 'left' | 'right'
  thumbnail: string
  category: 'layout'
}

export interface FontTemplate {
  id: string
  name: string
  description: string
  fontSize: number
  fontFamily: string
  lineHeight: number
  letterSpacing: number
  thumbnail: string
  category: 'font'
}

export interface ColorTemplate {
  id: string
  name: string
  description: string
  bgColor: string
  textColor: string
  accentColor: string
  thumbnail: string
  category: 'color'
}

export interface AnimationTemplate {
  id: string
  name: string
  description: string
  transitionType: 'fade' | 'slide' | 'zoom' | 'blur'
  duration: number
  thumbnail: string
  category: 'animation'
}

export type Template = LayoutTemplate | FontTemplate | ColorTemplate | AnimationTemplate
