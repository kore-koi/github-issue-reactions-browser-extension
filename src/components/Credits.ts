export const Credits = () => {
  const credits = document.createElement('div')
  credits.classList.add('credits')
  credits.style.display = 'flex'
  credits.style.gap = '0.5rem'
  credits.style.alignItems = 'center'
  credits.style.margin = '1rem 0'
  credits.style.fontSize = '0.8rem'
  credits.style.color = '#777'

  const laptopEmojiSpan = document.createElement('span')
  laptopEmojiSpan.appendChild(document.createTextNode('💻'))

  const extensionLink = document.createElement('a')
  extensionLink.href =
    'https://github.com/kore-koi/github-issue-reactions-browser-extension'
  extensionLink.appendChild(document.createTextNode('Reactions Extension'))

  const madeBySpan = document.createElement('span')
  madeBySpan.appendChild(document.createTextNode(' by '))

  const authorLink = document.createElement('a')
  authorLink.href = 'https://github.com/kore-koi'
  authorLink.appendChild(document.createTextNode('Korekoi'))

  credits.appendChild(laptopEmojiSpan)
  credits.appendChild(extensionLink)
  credits.appendChild(madeBySpan)
  credits.appendChild(authorLink)

  return credits
}