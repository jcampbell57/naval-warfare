import Player from './player.js'

class Game {
  constructor(
    mode,
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
  ) {
    this.p1 = new Player(playerOneName)
    this.p2 =
      mode === 'singlePlayer'
        ? new Player('Computer', 'AI')
        : new Player(playerTwoName)
    this.currentPlayer = this.p1
    this.mode = mode
    this.gameOver = false
  }

  // Move handling functions

  disableClickableBoard() {
    const clickableBoard = document.querySelector('.clickableBoard')
    clickableBoard.style.pointerEvents = 'none'
  }

  enableClickableBoard() {
    const clickableBoard = document.querySelector('.clickableBoard')
    clickableBoard.style.pointerEvents = 'auto'
  }

  handlePlayerMove(e) {
    // Do not allow moves during computer turn
    if (this.gameOver === false && this.currentPlayer.type === 'human') {
      if (this.currentPlayer === this.p1) {
        this.p2.gameboard.receiveAttack([
          e.target.dataset.row,
          e.target.dataset.column,
        ])
      } else if (this.currentPlayer === this.p2) {
        this.p1.gameboard.receiveAttack([
          e.target.dataset.row,
          e.target.dataset.column,
        ])
      }

      this.updateBoards(this.currentPlayer)

      // do not allow another move until next player
      this.disableClickableBoard()
      this.switchTurn()
    }
  }

  processPlayerMove = (e) => {
    if (e.target.classList.contains('clickableTile')) {
      this.handlePlayerMove(e)
    }
  }

  disableMoveListener() {
    const clickableBoard = document.querySelector('.clickableBoard')
    clickableBoard.removeEventListener('click', this.processPlayerMove)
  }

  enableMoveListener() {
    const clickableBoard = document.querySelector('.clickableBoard')
    clickableBoard.addEventListener('click', this.processPlayerMove)
  }

  // Ship placement functions

  refreshPlacementBoardDisplay() {
    const clickableBoard = document.querySelector('.clickableBoard')
    this.currentPlayer.gameboard.populate(clickableBoard, true)
  }

  enableNextPlayerBtn() {
    const nextPlayerBtn = document.querySelector('.nextPlayerBtn')
    nextPlayerBtn.classList.remove('hidden')
    nextPlayerBtn.addEventListener('click', () => {
      nextPlayerBtn.setAttribute('disabled', '')
      this.nextTurn()
    })
  }

  handleContinueInput = () => {
    if (this.currentPlayer.gameboard.allShipsPlaced()) {
      this.disableContinueBtn()

      if (this.currentPlayer === this.p1 && this.mode === 'multiPlayer') {
        this.currentPlayer = this.p2
        this.startShipPlacement()
      } else if (
        this.currentPlayer === this.p2 &&
        this.mode === 'multiPlayer'
      ) {
        this.currentPlayer = this.p1
        this.enableNextPlayerBtn()
        this.startGame()
      } else {
        this.startGame()
      }
    } else {
      this.setShipPlacementAlert('Place all ships before continuing.')
    }
  }

  clearShipPlacementAlert() {
    const shipPlacementAlert = document.querySelector('.shipPlacementAlert')
    shipPlacementAlert.textContent = ''
  }

  setShipPlacementAlert(message) {
    const shipPlacementAlert = document.querySelector('.shipPlacementAlert')
    shipPlacementAlert.textContent = message
  }

  disableContinueBtn() {
    const contBtn = document.querySelector('.continueBtn')
    contBtn.removeEventListener('click', this.handleContinueInput)
    contBtn.setAttribute('disabled', '')
  }

  enableContinueBtn() {
    const continueBtn = document.querySelector('.continueBtn')
    continueBtn.addEventListener('click', this.handleContinueInput)
    continueBtn.removeAttribute('disabled')
  }

  resetHighlights() {
    document
      .querySelectorAll('.validPlacement, .invalidPlacement')
      .forEach((tile) => {
        tile.classList.remove('validPlacement', 'invalidPlacement')
      })
  }

  handleShipHover = (e) => {
    if (!this.currentShip) return

    this.resetHighlights()

    const row = parseInt(e.target.dataset.row, 10)
    const col = parseInt(e.target.dataset.column, 10)
    const coords = [row, col]
    const tilesToHighlight = this.currentPlayer.gameboard.getTilesForShip(
      this.currentShip,
      coords,
      this.currentShip.orientation
    )

    tilesToHighlight.forEach(([r, c]) => {
      const tile = document.querySelector(
        `.clickableBoard [data-row="${r}"][data-column="${c}"]`
      )

      if (tile) {
        const canPlace = this.currentPlayer.gameboard.canPlaceShip(
          this.currentShip,
          coords,
          this.currentShip.orientation
        )

        if (canPlace) {
          tile.classList.add('validPlacement')
        } else {
          tile.classList.add('invalidPlacement')
        }
      }
    })
  }

  processShipPlacement = (e) => {
    const row = parseInt(e.target.dataset.row, 10)
    const col = parseInt(e.target.dataset.column, 10)
    let clearAlert = true

    if (this.currentShip === null) {
      this.setShipPlacementAlert('Select a ship')
      clearAlert = false
    } else if (
      this.currentShip &&
      this.currentPlayer.gameboard.placeShip(
        this.currentShip,
        [row, col],
        this.currentShip.orientation
      )
    ) {
      this.currentShip.placed = true
      this.currentShip.selected = false
      this.currentShip = null
      this.updateShipSelectionUI()
      this.refreshPlacementBoardDisplay()
    } else {
      this.setShipPlacementAlert('Invalid placement')
      clearAlert = false
    }

    if (clearAlert) {
      this.clearShipPlacementAlert()
    }

    if (this.currentPlayer.gameboard.allShipsPlaced()) {
      this.disableShipPlacementListener()
      this.enableContinueBtn()
    }
  }

  enableShipPlacementListener() {
    const clickableBoard = document.querySelector('.clickableBoard')
    clickableBoard.addEventListener('mouseover', this.handleShipHover)
    clickableBoard.addEventListener('click', this.processShipPlacement)
  }

  disableShipPlacementListener() {
    const clickableBoard = document.querySelector('.clickableBoard')
    clickableBoard.removeEventListener('mouseover', this.handleShipHover)
    clickableBoard.removeEventListener('click', this.processShipPlacement)
  }

  updateShipSelectionUI() {
    const shipSelectionContainer = document.querySelector(
      '.shipSelectionContainer'
    )
    shipSelectionContainer.innerHTML = ''

    this.currentPlayer.gameboard.ships.forEach((ship) => {
      shipSelectionContainer.appendChild(this.createShipButton(ship))
    })
    shipSelectionContainer.appendChild(document.createElement('br'))
    shipSelectionContainer.appendChild(this.createRotateButton())
    shipSelectionContainer.appendChild(this.createResetButton())
  }

  currentShip = null

  selectShip(ship) {
    if (this.currentShip) {
      this.currentShip.selected = false
    }
    this.currentShip = ship
    ship.selected = true
    this.clearShipPlacementAlert()
    this.updateShipSelectionUI()
  }

  rotateShip() {
    if (!this.currentShip) {
      this.setShipPlacementAlert('No ship selected')
    } else {
      this.currentShip.orientation =
        this.currentShip.orientation === 'horizontal'
          ? 'vertical'
          : 'horizontal'
    }
  }

  enableResetBtn() {
    const resetBtn = document.querySelector('.resetBtn')
    resetBtn.removeAttribute('disabled')
  }

  disableResetBtn() {
    const resetBtn = document.querySelector('.resetBtn')
    resetBtn.setAttribute('disabled', '')
  }

  resetShips() {
    this.disableResetBtn()

    if (this.currentPlayer.gameboard.allShipsPlaced()) {
      this.enableShipPlacementListener()
    }

    this.currentPlayer.gameboard.ships.forEach((ship) => {
      ship.placed = false
      ship.selected = false
    })

    this.currentPlayer.gameboard.resetTiles()
    this.disableContinueBtn()
    this.updateShipSelectionUI()
    this.refreshPlacementBoardDisplay()
  }

  createShipButton(ship) {
    const button = document.createElement('button')
    button.textContent = `${ship.name} (${ship.length})`
    button.classList.add('shipBtn')
    if (ship.selected || ship.placed) {
      button.setAttribute('disabled', '')
    } else {
      button.onclick = () => {
        this.selectShip(ship)
      }
    }
    return button
  }

  createRotateButton() {
    const rotateBtn = document.createElement('button')
    rotateBtn.classList.add('rotateBtn')
    rotateBtn.textContent = 'Rotate'
    if (!this.currentShip) {
      rotateBtn.setAttribute('disabled', '')
    } else {
      rotateBtn.addEventListener('click', this.rotateShip.bind(this))
    }
    return rotateBtn
  }

  createResetButton() {
    const resetBtn = document.createElement('button')
    resetBtn.classList.add('resetBtn')
    resetBtn.textContent = 'Reset'
    if (this.currentPlayer.gameboard.ships.every((ship) => !ship.placed)) {
      resetBtn.setAttribute('disabled', '')
    } else {
      resetBtn.addEventListener('click', this.resetShips.bind(this))
    }
    return resetBtn
  }

  startShipPlacement() {
    if (this.mode === 'multiPlayer') {
      this.setShipPlacementHeader()
    }

    const clickableBoard = document.querySelector('.clickableBoard')
    this.currentPlayer.gameboard.populate(clickableBoard, true)

    this.enableShipPlacementListener()
    this.updateShipSelectionUI()
  }

  // UI & game logic functions

  setShipPlacementHeader() {
    const shipPlacementHeader = document.querySelector('.shipPlacementHeader')
    shipPlacementHeader.textContent = `${this.currentPlayer.name}, place your ships:`
  }

  prepareGameUI() {
    const header = document.querySelector('.shipPlacementHeaderContainer')
    header.classList.add('hidden')

    const selectionContainer = document.querySelector('.shipSelectionContainer')
    selectionContainer.classList.add('hidden')

    const continueBtn = document.querySelector('.continueBtn')
    continueBtn.classList.add('hidden')

    const unclickableBoard = document.querySelector('.unclickableBoard')
    unclickableBoard.classList.remove('hidden')
  }

  displayContent() {
    const startMenu = document.querySelector('.startMenu')
    const contentContainer = document.querySelector('.contentContainer')

    startMenu.classList.add('hidden')
    contentContainer.classList.remove('hidden')
  }

  resetPreviousResult() {
    const resultContainer = document.querySelector('.resultContainer')
    if (resultContainer) {
      resultContainer.remove()
    }

    document.querySelector('.nextPlayerBtn').classList.add('hidden')

    const header = document.querySelector('.shipPlacementHeaderContainer')
    header.classList.remove('hidden')

    const shipContainer = document.querySelector('.shipSelectionContainer')
    shipContainer.classList.remove('hidden')

    const continueBtn = document.querySelector('.continueBtn')
    continueBtn.classList.remove('hidden')

    const unclickableBoard = document.querySelector('.unclickableBoard')
    unclickableBoard.classList.add('hidden')

    this.enableClickableBoard()
  }

  displayMenu() {
    const startMenu = document.querySelector('.startMenu')
    const contentContainer = document.querySelector('.contentContainer')

    startMenu.classList.remove('hidden')
    contentContainer.classList.add('hidden')
  }

  playAgain() {
    this.resetPreviousResult()
    this.displayMenu()
  }

  updateBoards(currentPlayer) {
    const unclickableBoard = document.querySelector('.unclickableBoard')
    const clickableBoard = document.querySelector('.clickableBoard')

    if (currentPlayer === this.p1) {
      this.p1.gameboard.populate(unclickableBoard)
      this.p2.gameboard.populate(clickableBoard)
    } else if (currentPlayer === this.p2) {
      this.p2.gameboard.populate(unclickableBoard)
      this.p1.gameboard.populate(clickableBoard)
    }
  }

  randomComputerMove() {
    setTimeout(() => {
      this.p1.makeRandomMove()
      this.updateBoards(this.p1)
      this.switchTurn()
    }, 200)
  }

  switchTurn() {
    if (this.checkForWinner()) {
      return
    }

    this.currentPlayer = this.currentPlayer === this.p1 ? this.p2 : this.p1
    if (this.mode === 'singlePlayer') {
      this.nextTurn()
    } else if (this.mode === 'multiPlayer') {
      document.querySelector('.nextPlayerBtn').removeAttribute('disabled')
    }
  }

  nextTurn() {
    this.enableClickableBoard()

    if (this.currentPlayer.type === 'human' && this.mode === 'multiPlayer') {
      // display turn indicator with continue button
      const contentContainer = document.querySelector('.contentContainer')
      const privacyScreen = document.querySelector('.privacyScreen')
      const turnIndicator = document.querySelector('.turnIndicator')

      turnIndicator.textContent = `${this.currentPlayer.name}'s turn`
      contentContainer.classList.add('hidden')
      privacyScreen.classList.remove('hidden')
      privacyScreen.setAttribute('aria-hidden', 'false')
      this.updateBoards(this.currentPlayer)
    } else if (this.currentPlayer.type === 'AI') {
      this.randomComputerMove()
    }
  }

  endGame(winner) {
    this.gameOver = true
    this.disableMoveListener()

    // update winner display
    const resultContainer = document.createElement('div')
    resultContainer.classList.add('resultContainer')

    const winnerText = document.createElement('h2')
    winnerText.textContent = `${winner.name} wins!`

    resultContainer.appendChild(winnerText)

    // create play again button
    const playAgainBtn = document.createElement('button')
    playAgainBtn.classList.add('playAgainBtn')
    playAgainBtn.textContent = 'Play again?'
    playAgainBtn.setAttribute('aria-label', 'Play again')
    playAgainBtn.addEventListener('click', () => this.playAgain())

    resultContainer.appendChild(playAgainBtn)

    // display winner & play again button
    const contentContainer = document.querySelector('.contentContainer')
    contentContainer.prepend(resultContainer)
  }

  checkForWinner() {
    if (this.p1.gameboard.allShipsSunk()) {
      this.endGame(this.p2)
      return true
    } else if (this.p2.gameboard.allShipsSunk()) {
      this.endGame(this.p1)
      return true
    } else {
      return false
    }
  }

  initiateShipPlacement() {
    this.displayContent()
    this.startShipPlacement(this.p1)
  }

  startGame() {
    if (this.mode === 'singlePlayer') {
      this.p2.gameboard.placeAllShipsRandomly()
    }
    this.prepareGameUI()
    this.updateBoards(this.currentPlayer)
    this.enableMoveListener()
  }
}

export default Game
