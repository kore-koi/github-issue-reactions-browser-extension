import { SvgBlockIcon } from "./SvgBlockIcon"
import { SvgInlineBlockIcon } from "./SvgInlineBlockIcon"
import { Switch } from "./Switch"

export const Title = (title: string, withSwitch = false) => {
  const element = document.createElement('div') satisfies HTMLDivElement
  element.style.display = 'flex'
  element.style.justifyContent = 'space-between'
  element.style.alignItems = 'center'
  element.style.fontWeight = 'bold'
  element.style.margin = '1.25rem 0 0.5rem 0'

  element.appendChild(document.createTextNode(title))

  if (withSwitch) {
    const switchDiv = document.createElement('div')
    switchDiv.appendChild(SvgBlockIcon())
    switchDiv.appendChild(Switch())
    switchDiv.appendChild(SvgInlineBlockIcon())
    element.appendChild(switchDiv)
  }

  return element
}