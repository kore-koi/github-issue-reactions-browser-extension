import { DISPLAY, reactionClass } from "../constants"
import { getBrowser } from "../helpers"
import { Display, GHElement } from "../types"

export const Reactions = (): HTMLDivElement => {
  const all = document.createElement('div')

  const issueUrl =
    window.location.origin + window.location.pathname + window.location.search

  // Grabbing all reactions Reactions 👍 🚀 🎉 😄 ❤️ 😕 👎 👀
  const reactions = [
    { emoji: '👍', name: '+1' },
    { emoji: '🚀', name: 'rocket' },
    { emoji: '🎉', name: 'tada' },
    { emoji: '😄', name: 'smile' },
    { emoji: '❤️', name: 'heart' },
    { emoji: '😕', name: 'thinking_face' },
    { emoji: '👎', name: '-1' },
    { emoji: '👀', name: 'eyes' },
  ]

  const findReaction = (node: Element) => (reaction: typeof reactions[number]) =>
    node.textContent?.includes(reaction.emoji) ||
    node.querySelector(`g-emoji[alias="${reaction.name}"]`)

  Array.from(document.querySelectorAll<GHElement>('.js-comment-reactions-options'))
    .filter((node) => reactions.some(findReaction(node)))
    .forEach((reactionSection) => {
      const combinedReactions = Array.from(
        reactionSection.querySelectorAll('button[class*="reaction"]')
      )
        .map((btn) => ({
          emoji: reactions.find(findReaction(btn))?.emoji,
          count: btn.textContent?.match(/\d+/)?.join(''),
        }))
        .filter((reaction) => reaction.emoji && reaction.count)
        .reduce((acc, { emoji, count }) => `${acc} ${emoji} ${count}`, '')

      const linkContainer = document.createElement('div')
      linkContainer.classList.add(reactionClass)

      const a = document.createElement('a')
      const linkText = document.createTextNode('  ' + combinedReactions)
      linkContainer.appendChild(a)
      a.appendChild(linkText)
      a.title = combinedReactions

      let id = null
      while (id == null) {
        if (reactionSection.tagName === 'A' && reactionSection.name) {
          id = reactionSection.name
          break
        }
        if (reactionSection.id) {
          id = reactionSection.id
          break
        }
        // @ts-expect-error
        reactionSection = reactionSection.parentNode
      }

      linkContainer.style.margin = '0.5rem 0'
      a.href = issueUrl + '#' + id
      a.style.border = '1px solid var(--borderColor-default, #d2dff0)'
      a.style.borderRadius = '100px'
      a.style.padding = '2px 7px'
      a.style.color = 'var(--color-fg-muted)'

      all.appendChild(linkContainer)
    })

  getBrowser()
    .storage.sync.get([DISPLAY])
    .then((result: { [x: string]: string }) => {
      const display = (result[DISPLAY] as Display) ?? 'block'
      const elements = Array.from(
        document.getElementsByClassName(reactionClass)
      ) as HTMLDivElement[]
      for (let element of elements) {
        element.style.display = display
      }
    })

  if (all.childElementCount === 0) {
    const noReactions = document.createElement('div')
    noReactions.innerText = '🤷‍♂️ no reactions found'
    all.appendChild(noReactions)
  }

  return all
}