import { backgroundColor, primaryColor } from "../constants"

export const LoadingSpinner = (): HTMLDivElement => {
  const loadingSpinner = document.createElement('div')
  const side = '25px'
  loadingSpinner.style.width = side
  loadingSpinner.style.height = side
  loadingSpinner.style.border = `2px solid ${backgroundColor}`
  loadingSpinner.style.borderTop = `2px solid ${primaryColor}`
  loadingSpinner.style.borderRadius = '50%'
  loadingSpinner.style.animation = 'spin 1s linear infinite'
  const style = document.createElement('style')
  document.head.appendChild(style)
  const keyframes = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }`
  style.sheet?.insertRule(keyframes)

  return loadingSpinner
}