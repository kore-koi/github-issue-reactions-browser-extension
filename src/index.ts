import { Credits } from "./components/Credits"
import { DiscussionVotes } from "./components/DiscussionVotes"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { Reactions } from "./components/Reactions"
import { Title } from "./components/Title"
import { DISPLAY, reactionClass, sideBarId, wrapperId } from "./constants"
import { getBrowser, hasAncestorWithId } from "./helpers"


// INITIAL LOADING INDICATOR
injectWrapper({ withLoadingSpinner: true })

// Create a sticking wrapper to place all reactions
function injectWrapper({ withLoadingSpinner } = { withLoadingSpinner: false }) {
  if (document.querySelector('header')?.innerText.includes('Sign in')) {
    const header = document.querySelector(sideBarId) as HTMLDivElement
    if (header) {
      const notSignedInClass = 'not-signed-in'
      Array.from(document.querySelectorAll(`.${notSignedInClass}`)).forEach(
        (element) => element?.remove()
      )
      const textHeader = document.createElement('div')
      textHeader.className = notSignedInClass
      textHeader.style.margin = '1.25rem 0 0.2rem 0'
      textHeader.style.fontWeight = 'bold'
      textHeader.appendChild(
        document.createTextNode('Sign in to list reactions')
      )
      // add the text below "Github source code is different for signed out users and it is currently too much work to support both"
      const textReason = document.createElement('div')
      textReason.className = notSignedInClass
      textReason.style.margin = '1.25rem 0 0.5rem 0'
      textReason.style.fontStyle = 'italic'
      textReason.appendChild(
        document.createTextNode(
          'Github source code is different for signed out users and it is currently too much work to support both - sorry! 🙈'
        )
      )
      textReason.appendChild(
        document.createTextNode(
          'You are welcome to contribute to the project on Github 🙌'
        )
      )
      header.appendChild(textHeader)
      header.appendChild(textReason)

      Array.from(document.querySelectorAll(`.credits`)).forEach((element) =>
        element?.remove()
      )
      header.appendChild(Credits())
    }
    return
  }

  const header = document.querySelector(sideBarId) as HTMLDivElement
  if (!header) return

  header.style.position = 'relative'
  header.style.height = '100%'

  const wrapper = document.createElement('div')
  wrapper.setAttribute('id', wrapperId.replace('#', ''))
  const top =
    document.querySelectorAll('.gh-header-sticky').length > 0 ? 70 : 10
  wrapper.style.position = 'sticky'
  wrapper.style.setProperty('position', '-webkit-sticky', 'important')
  wrapper.style.top = top + 'px'
  wrapper.innerHTML = ''

  wrapper.appendChild(Title('Reactions', true))
  if (withLoadingSpinner) {
    wrapper.appendChild(LoadingSpinner())
  }
  header.appendChild(wrapper)
}


const observer = new MutationObserver((mutations: MutationRecord[]) => {
  for (const mutation of mutations) {
    if (
      hasAncestorWithId(
        mutation.target as Element | null,
        sideBarId.replace('#', '')
      ) ||
      hasAncestorWithId(
        mutation.target as Element | null,
        wrapperId.replace('#', '')
      )
    ) {
      continue
    }

    // Check if the URL contains /discussions/ or /issues/
    if (/\/(discussions|issues|pull)\//.test(window.location.pathname)) {
      addReactionNav()
    }
  }
})

// Start observing mutations on the whole document
observer.observe(document, {
  childList: true,
  subtree: true,
})

// Scan the site for reactions and stick it into the wrapper
function addReactionNav() {
  document.querySelector(wrapperId)?.remove()
  injectWrapper()
  const wrapper = document.querySelector(wrapperId)
  if (!wrapper) {
    return
  }

  wrapper.appendChild(Reactions())
  if (window.location.pathname.match(/\/discussions\//)) {
    wrapper.appendChild(Title('Discussion Votes'))
    wrapper.appendChild(DiscussionVotes())
  }
  wrapper.appendChild(Credits())
}


getBrowser().storage.onChanged.addListener(function (changes) {
  for (let key in changes) {
    if (key === DISPLAY) {
      const display =
        changes[key].newValue === 'block' ? 'block' : 'inline-block'
      const elements = Array.from(
        document.getElementsByClassName(reactionClass)
      ) as HTMLDivElement[]
      for (let element of elements) {
        element.style.display = display
      }
    }
  }
})

