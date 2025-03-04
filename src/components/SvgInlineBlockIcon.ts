import { primaryColor } from "../constants"

export const SvgInlineBlockIcon = (): HTMLSpanElement => {
  const svg = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="14" height="14" />
      <line x1="1.5" y1="1.5" x2="3.5" y2="1.5" stroke=${primaryColor} stroke-linecap="round"/>
      <line x1="5.5" y1="1.5" x2="7.5" y2="1.5" stroke=${primaryColor} stroke-linecap="round"/>
      <line x1="1.5" y1="3.5" x2="7.5" y2="3.5" stroke=${primaryColor} stroke-linecap="round"/>
      <line x1="9.5" y1="3.5" x2="11.5" y2="3.5" stroke=${primaryColor} stroke-linecap="round"/>
      <line x1="1.5" y1="5.5" x2="5.5" y2="5.5" stroke=${primaryColor} stroke-linecap="round"/>
      <line x1="7.5" y1="5.5" x2="9.5" y2="5.5" stroke=${primaryColor} stroke-linecap="round"/>
    </svg>
  `
  const span = document.createElement('span')
  span.innerHTML = svg

  return span
}