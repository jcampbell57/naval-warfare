import Gameboard from './gameboard'

class Player {
  constructor(name, type = 'human') {
    this.name = name
    this.type = type
    this.gameboard = new Gameboard()
  }

  makeRandomMove() {
    while (true) {
      const row = Math.floor(Math.random() * 10)
      const col = Math.floor(Math.random() * 10)

      if (
        this.gameboard.tiles[row][col] !== 'hit' &&
        this.gameboard.tiles[row][col] !== 'miss'
      ) {
        this.gameboard.receiveAttack([row, col])
        return
      }
    }
  }
}

export default Player
