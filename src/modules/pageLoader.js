import githubIcon from '../assets/GitHub-light-32px.png'
import Game from './game'

const createHeader = () => {
  const header = document.createElement('header')

  const title = document.createElement('h1')
  title.classList.add('b612-bold', 'gameTitle')
  title.textContent = 'NAVAL WARFARE'
  header.appendChild(title)

  return header
}

const showNameInputForm = () => {
  const startMenu = document.querySelector('.startMenu')
  startMenu.classList.add('hidden')

  const nameInputContainer = document.querySelector('.nameInputContainer')
  nameInputContainer.classList.remove('hidden')
}

const validateNameInputs = () => {
  const playerOneInputValue = document.getElementById('playerOneInput').value
  const errorContainerOne = document.querySelector('.errorContainerOne')
  const playerTwoInputValue = document.getElementById('playerTwoInput').value
  const errorContainerTwo = document.querySelector('.errorContainerTwo')

  let isValid = true

  if (playerOneInputValue === '') {
    errorContainerOne.textContent = 'Name cannot be blank'
    isValid = false
  } else {
    errorContainerOne.textContent = ''
  }

  if (playerTwoInputValue === '') {
    errorContainerTwo.textContent = 'Name cannot be blank'
    isValid = false
  } else {
    errorContainerTwo.textContent = ''
  }

  return isValid
}

const initiateGame = (mode, playerOneName, playerTwoName) => {
  if (mode === 'singlePlayer') {
    const newGame = new Game(mode)
    newGame.initiateShipPlacement()
  } else if (mode === 'multiPlayer') {
    const newGame = new Game(mode, playerOneName, playerTwoName)
    newGame.initiateShipPlacement()
  }
}

const createStartMenu = () => {
  const startMenu = document.createElement('div')
  startMenu.setAttribute('class', 'startMenu')

  const startMenuHeader = document.createElement('h2')
  startMenuHeader.textContent = 'Choose mode:'

  const onePlayerBtn = document.createElement('button')
  onePlayerBtn.classList.add('StartMenuBtn')
  onePlayerBtn.textContent = 'Single player'
  onePlayerBtn.addEventListener('click', () => initiateGame('singlePlayer'))

  const twoPlayerBtn = document.createElement('button')
  twoPlayerBtn.classList.add('StartMenuBtn')
  twoPlayerBtn.textContent = 'Multiplayer'
  // twoPlayerBtn.addEventListener('click', () => initiateGame('multiPlayer'))
  twoPlayerBtn.addEventListener('click', () => showNameInputForm())

  startMenu.appendChild(startMenuHeader)
  startMenu.appendChild(onePlayerBtn)
  startMenu.appendChild(twoPlayerBtn)

  return startMenu
}

const createNameInputScreen = () => {
  const nameInputContainer = document.createElement('div')
  nameInputContainer.classList.add('nameInputContainer', 'hidden')

  const nameInputForm = document.createElement('form')
  nameInputForm.classList.add('nameInputForm')
  nameInputForm.method = 'get'

  const formRowOne = document.createElement('div')
  formRowOne.classList.add('formRow')

  const playerOneLabel = document.createElement('label')
  playerOneLabel.setAttribute('for', 'playerOneInput')
  playerOneLabel.textContent = 'Player one name'

  const playerOneInput = document.createElement('input')
  playerOneInput.setAttribute('type', 'text')
  playerOneInput.setAttribute('name', 'playerOneInput')
  playerOneInput.setAttribute('id', 'playerOneInput')

  const errorContainerOne = document.createElement('span')
  errorContainerOne.classList.add('errorContainerOne', 'errorContainer')

  const formRowTwo = document.createElement('div')
  formRowTwo.classList.add('formRow')

  const playerTwoLabel = document.createElement('label')
  playerTwoLabel.setAttribute('for', 'playerTwoInput')
  playerTwoLabel.textContent = 'Player two name'

  const playerTwoInput = document.createElement('input')
  playerTwoInput.setAttribute('type', 'text')
  playerTwoInput.setAttribute('name', 'playerTwoInput')
  playerTwoInput.setAttribute('id', 'playerTwoInput')

  const errorContainerTwo = document.createElement('span')
  errorContainerTwo.classList.add('errorContainerTwo', 'errorContainer')

  const formRowThree = document.createElement('div')
  formRowThree.classList.add('formRow')

  const playBtn = document.createElement('button')
  playBtn.classList.add('playBtn')
  playBtn.innerText = 'Play'
  playBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let isValid = validateNameInputs()
    if (isValid) {
      const playerOneName = document.getElementById('playerOneInput').value
      const playerTwoName = document.getElementById('playerTwoInput').value
      nameInputContainer.classList.add('hidden')
      initiateGame('multiPlayer', playerOneName, playerTwoName)
    }
  })

  formRowOne.appendChild(playerOneLabel)
  formRowOne.appendChild(playerOneInput)
  formRowOne.appendChild(errorContainerOne)

  formRowTwo.appendChild(playerTwoLabel)
  formRowTwo.appendChild(playerTwoInput)
  formRowTwo.appendChild(errorContainerTwo)

  formRowThree.appendChild(playBtn)

  nameInputForm.appendChild(formRowOne)
  nameInputForm.appendChild(formRowTwo)
  nameInputForm.appendChild(formRowThree)

  nameInputContainer.appendChild(nameInputForm)

  return nameInputContainer
}

const createContent = () => {
  const contentContainer = document.createElement('div')
  contentContainer.classList.add('contentContainer', 'hidden')

  const shipPlacementHeaderContainer = document.createElement('div')
  shipPlacementHeaderContainer.classList.add('shipPlacementHeaderContainer')

  const shipPlacementHeader = document.createElement('h2')
  shipPlacementHeader.classList.add('shipPlacementHeader')
  shipPlacementHeader.textContent = 'Place your ships:'

  const shipPlacementAlert = document.createElement('p')
  shipPlacementAlert.classList.add('shipPlacementAlert')

  shipPlacementHeaderContainer.appendChild(shipPlacementHeader)
  shipPlacementHeaderContainer.appendChild(shipPlacementAlert)

  const boardContainer = document.createElement('div')
  boardContainer.classList.add('boardContainer')

  const unclickableBoard = document.createElement('div')
  unclickableBoard.classList.add('unclickableBoard', 'hidden')

  const clickableBoard = document.createElement('div')
  clickableBoard.classList.add('clickableBoard')

  const shipSelectionContainer = document.createElement('div')
  shipSelectionContainer.classList.add('shipSelectionContainer')

  boardContainer.appendChild(unclickableBoard)
  boardContainer.appendChild(clickableBoard)
  boardContainer.appendChild(shipSelectionContainer)

  const continueBtn = document.createElement('button')
  continueBtn.textContent = 'Continue'
  continueBtn.classList.add('continueBtn')
  continueBtn.setAttribute('disabled', '')

  const nextPlayerBtn = document.createElement('button')
  nextPlayerBtn.textContent = 'Next player'
  nextPlayerBtn.classList.add('nextPlayerBtn', 'hidden')
  nextPlayerBtn.setAttribute('disabled', '')

  contentContainer.appendChild(shipPlacementHeaderContainer)
  contentContainer.appendChild(boardContainer)
  contentContainer.appendChild(continueBtn)
  contentContainer.appendChild(nextPlayerBtn)

  return contentContainer
}

const createPrivacyScreen = () => {
  const privacyScreen = document.createElement('div')
  privacyScreen.classList.add('privacyScreen', 'hidden')

  const turnIndicator = document.createElement('h2')
  turnIndicator.classList.add('turnIndicator')

  const continueBtn = document.createElement('button')
  continueBtn.classList.add('continueBtn')
  continueBtn.textContent = 'Continue'
  continueBtn.addEventListener('click', () => {
    const contentContainer = document.querySelector('.contentContainer')

    privacyScreen.classList.add('hidden')
    contentContainer.classList.remove('hidden')
  })

  privacyScreen.appendChild(turnIndicator)
  privacyScreen.appendChild(continueBtn)

  return privacyScreen
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
  document.body.appendChild(createStartMenu())
  document.body.appendChild(createNameInputScreen())
  document.body.appendChild(createContent())
  document.body.appendChild(createPrivacyScreen())
  document.body.appendChild(createFooter())
}
