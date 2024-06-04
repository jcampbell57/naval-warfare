import Ship from './ship'

class Gameboard {
  constructor() {
    this.tiles = []
    this.ships = []

    for (let i = 0; i < 10; i++) {
      const row = new Array(10).fill(null)
      this.tiles.push(row)
    }
  }

  placeShip(ship, coords, orientation = 'horizontal') {
    const [row, col] = coords

    // Check for out of bounds
    if (
      (orientation == 'horizontal' && col + ship.length > 10) ||
      (orientation == 'vertical' && row + ship.length > 10)
    ) {
      return false // Out of bounds
    }

    // Check for overlap
    for (let i = 0; i < ship.length; i++) {
      if (
        (orientation == 'horizontal' && this.tiles[row][col + i] !== null) ||
        (orientation == 'vertical' && this.tiles[row + i][col] !== null)
      ) {
        return false // Overlaps another ship
      }
    }

    // Place ship
    for (let i = 0; i < ship.length; i++) {
      if (orientation == 'horizontal') {
        this.tiles[row][col + i] = ship
      } else {
        this.tiles[row + i][col] = ship
      }
    }

    this.ships.push(ship)
    return true // Ship placed successfully
  }

  receiveAttack(coords) {
    const [row, col] = coords
    let targetTile = this.tiles[row][col]

    if (targetTile instanceof Ship) {
      targetTile.hit()
      this.tiles[row][col] = 'hit'
    } else {
      this.tiles[row][col] = 'miss'
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk())
  }
}

export default Gameboard
