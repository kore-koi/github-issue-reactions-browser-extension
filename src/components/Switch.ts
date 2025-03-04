import { backgroundColor, DISPLAY, primaryColor } from "../constants"
import { getBrowser } from "../helpers"
import { Display } from "../types"

export const Switch = (): HTMLSpanElement => {
  const switchContainer = document.createElement('span')
  const switchLabel = document.createElement('label')
  const switchInput = document.createElement('span')
  switchLabel.appendChild(switchInput)
  const switchHandle = document.createElement('span')
  switchHandle.setAttribute('class', 'switch-handle-reactions-layout')
  switchLabel.appendChild(switchHandle)
  switchContainer.appendChild(switchLabel)

  // Add CSS styles to the switch container
  switchContainer.style.display = 'inline-block'
  switchContainer.style.position = 'relative'
  switchContainer.style.backgroundColor = backgroundColor
  switchContainer.style.borderRadius = '14px'
  switchContainer.style.width = '30px'
  switchContainer.style.height = '17px'

  // Add CSS styles to the switch label
  switchLabel.style.display = 'block'
  switchLabel.style.position = 'relative'
  switchLabel.style.width = '100%'
  switchLabel.style.height = '100%'
  switchLabel.style.cursor = 'pointer'

  // Add CSS styles to the switch input
  switchInput.style.display = 'none'

  // Add CSS styles to the switch handle
  switchHandle.style.display = 'block'
  switchHandle.style.position = 'absolute'
  switchHandle.style.top = '1px'
  switchHandle.style.width = '14px'
  switchHandle.style.height = '14px'
  switchHandle.style.borderRadius = '14px'
  switchHandle.style.backgroundColor = primaryColor
  switchHandle.style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.1)'
  switchHandle.style.transition = 'left 0.2s ease-in-out'

  const toggle = (value: boolean) => {
    switchHandle.style.left = value ? '12px' : '2px'
  }

  getBrowser()
    .storage.sync?.get([DISPLAY])
    ?.then((result) => {
      if (!result[DISPLAY]) return
      toggle(result[DISPLAY] === 'inline-block')
    })

  // Add an event listener to the switch
  switchContainer.addEventListener('click', async function changeSwitch() {
    // Get Layout from storage and change it to the opposite (either block or inline-block)
    const settings = await getBrowser().storage.sync.get([DISPLAY])
    const display: Display =
      settings[DISPLAY] === 'inline-block' ? 'block' : 'inline-block'
    getBrowser().storage.sync.set({ [DISPLAY]: display })
  })

  getBrowser().storage.onChanged.addListener(function (changes, _namespace) {
    for (const key in changes) {
      const storageChange = changes[key]
      if (key === DISPLAY) {
        toggle(storageChange.newValue === 'inline-block')
      }
    }
  })

  return switchContainer
}