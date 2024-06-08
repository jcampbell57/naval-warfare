import githubIcon from '../assets/GitHub-light-32px.png'

const createHeader = () => {
  const header = document.createElement('header')

  const title = document.createElement('h1')
  title.classList.add('b612-bold')
  title.textContent = 'Naval Warfare'
  header.appendChild(title)

  return header
}

const createContent = () => {
  const contentContainer = document.createElement('div')
  contentContainer.classList.add('contentContainer', 'hidden')

  const boardContainer = document.createElement('div')
  boardContainer.classList.add('boardContainer')

  const unclickableBoard = document.createElement('div')
  unclickableBoard.classList.add('unclickableBoard')

  const clickableBoard = document.createElement('div')
  clickableBoard.classList.add('clickableBoard')

  const nextPlayerBtn = document.createElement('button')
  nextPlayerBtn.textContent = 'Next player'
  nextPlayerBtn.classList.add('nextPlayerBtn', 'hidden')
  nextPlayerBtn.setAttribute('disabled', '')

  boardContainer.appendChild(unclickableBoard)
  boardContainer.appendChild(clickableBoard)
  contentContainer.appendChild(boardContainer)
  contentContainer.appendChild(nextPlayerBtn)

  return contentContainer
}

const createFooter = () => {
  const footer = document.createElement('footer')

  const copyright = document.createElement('p')
  copyright.textContent = `Copyright © ${new Date().getFullYear()} jcampbell57`

  const githubLink = document.createElement('a')
  githubLink.href = 'https://github.com/jcampbell57'
  githubLink.target = '_blank'

  const newGithubIcon = document.createElement('img')
  newGithubIcon.src = githubIcon
  newGithubIcon.setAttribute('class', 'githubIcon')

  githubLink.appendChild(newGithubIcon)
  footer.appendChild(copyright)
  footer.appendChild(githubLink)

  return footer
}

export default function initialize() {
  document.body.appendChild(createHeader())
  document.body.appendChild(createContent())
  document.body.appendChild(createFooter())
}
