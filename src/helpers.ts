export const getBrowser = (): typeof browser | typeof chrome => {
  if (navigator.userAgent.match(/Chrome/)) return chrome
  return browser
}

export const hasAncestorWithId = (element: Element | null, id: string) => {
  while (element) {
    if (element.id === id) {
      return true
    }
    element = element.parentElement
  }
  return false
}