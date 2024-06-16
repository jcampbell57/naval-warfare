import Ship from './ship'
import { createHitIcon, createMissIcon } from './icons.js'

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

  placeShipRandomly(ship) {
    while (true) {
      const orientation = Math.random() > 0.5 ? 'vertical' : 'horizontal'
      const coords = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ]

      if (this.placeShip(ship, coords, orientation) === true) {
        return
      }
    }
  }

  placeAllShipsRandomly() {
    this.placeShipRandomly(new Ship(5))
    this.placeShipRandomly(new Ship(4))
    this.placeShipRandomly(new Ship(3))
    this.placeShipRandomly(new Ship(3))
    this.placeShipRandomly(new Ship(2))
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

  clearTiles(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }

  populate(container) {
    this.clearTiles(container)

    this.tiles.forEach((row, rowIndex) => {
      row.forEach((tileContent, columnIndex) => {
        const newTile = document.createElement('div')
        newTile.setAttribute('data-row', rowIndex)
        newTile.setAttribute('data-column', columnIndex)
        newTile.classList.add('boardTile')

        if (tileContent === 'hit') {
          newTile.appendChild(createHitIcon())
          newTile.classList.add('shipTile')
        } else if (tileContent === 'miss') {
          newTile.appendChild(createMissIcon())
        } else if (
          container.classList.contains('unclickableBoard') &&
          tileContent instanceof Ship
        ) {
          newTile.classList.add('shipTile')
        } else if (
          container.classList.contains('clickableBoard') &&
          tileContent !== 'hit' &&
          tileContent !== 'miss'
        ) {
          newTile.classList.add('clickableTile')
        }

        container.appendChild(newTile)
      })
    })
  }
}

export default Gameboard
