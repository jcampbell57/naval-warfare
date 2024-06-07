import Gameboard from './gameboard'

class Player {
  constructor(name, type = 'human') {
    this.name = name
    this.type = type
    this.gameboard = new Gameboard()
  }
}

export default Player
