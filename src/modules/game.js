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

  initiateBoardListener() {
    const clickableBoard = document.querySelector('.clickableBoard')
    clickableBoard.addEventListener('click', (e) => {
      if (e.target.classList.contains('clickableTile')) {
        this.handlePlayerMove(e)
      }
    })
  }

  displayBoards() {
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
      this.updateBoards(this.currentPlayer)
    } else if (this.currentPlayer.type === 'AI') {
      this.randomComputerMove()
    }
  }

  endGame(winner) {
    this.gameOver = true

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

  startGame() {
    this.initiateBoardListener()
    this.displayBoards()
    this.p1.gameboard.placeAllShipsRandomly()
    this.p2.gameboard.placeAllShipsRandomly()
    this.updateBoards(this.p1)
    this.nextTurn()
  }
}

export default Game
