import { DISPLAY } from "./constants"

export interface GHElement extends Element {
  dataset: DOMStringMap
  name: string
}

export type Display = 'block' | 'inline-block'

export type Settings = {
  [DISPLAY]: Display
}
