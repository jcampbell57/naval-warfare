import Gameboard from './gameboard'

class Player {
  constructor(name, type = 'human') {
    this.name = name
    this.type = type
    this.gameboard = new Gameboard()
    this.lastHit = null
  }

  checkForHit(row, col) {
    if (this.gameboard.isHit(row, col)) {
      this.lastHit = [row, col]
    } else {
      this.lastHit = null
    }
  }

  makeRandomMove() {
    // If lastHit, try adjacent tiles
    if (this.lastHit) {
      const adjacentTiles = this.gameboard.getAdjacentTiles(this.lastHit)
      for (let [newRow, newCol] of adjacentTiles) {
        if (this.gameboard.isValidMove(newRow, newCol)) {
          this.gameboard.receiveAttack([newRow, newCol])
          this.checkForHit(newRow, newCol)
          return
        }
      }
    }

    // Fallback to random move
    while (true) {
      let row = Math.floor(Math.random() * 10)
      let col = Math.floor(Math.random() * 10)

      if (this.gameboard.isValidMove(row, col)) {
        this.gameboard.receiveAttack([row, col])
        this.checkForHit(row, col)
        return
      }
    }
  }
}

export default Player
