import { reactionClass } from "../constants"
import { GHElement } from "../types"

export const DiscussionVotes = (): HTMLDivElement => {
  const all = document.createElement('div')
  document.querySelectorAll<GHElement>('[data-url]').forEach((discussionComment) => {
    const defaultVote = discussionComment.querySelector(
      '.js-default-vote-count'
    )
    const upvotedVote = discussionComment.querySelector(
      '.js-upvoted-vote-count'
    )
    const isUpvote = !!discussionComment.querySelector('[data-upvoted="true"]')
    const vote = isUpvote ? upvotedVote : defaultVote
    let url = discussionComment.dataset?.url?.replace(
      '/comments/',
      '#discussioncomment-'
    )
    if (!url) return

    if (url.match(/body$/)) {
      url = `${window.location.origin +
        window.location.pathname +
        window.location.search
        }#${discussionComment.children[0].id}`
    }

    if (!vote || url.match(/votes$/)) return
    const votes = vote.textContent
    const a = document.createElement('a')
    const linkText = document.createTextNode(
      `\n⬆️ ${votes}${isUpvote ? ' 🫵' : ''}`
    )
    a.appendChild(linkText)
    a.title = url
    a.href = url
    a.style.border = '1px solid var(--borderColor-default, #d2dff0)'
    a.style.borderRadius = '100px'
    a.style.padding = '2px 7px'
    a.style.margin = '0.5rem 0'
    const linkContainer = document.createElement('div')
    linkContainer.appendChild(a)
    linkContainer.classList.add(reactionClass)
    all.appendChild(linkContainer)
  })

  return all
}