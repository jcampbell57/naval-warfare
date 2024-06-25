import Ship from './ship'
import { createHitIcon, createMissIcon } from './icons.js'

class Gameboard {
  constructor() {
    this.tiles = []
    this.ships = [
      new Ship('Carrier', 5),
      new Ship('Battleship', 4),
      new Ship('Cruiser', 3),
      new Ship('Submarine', 3),
      new Ship('Destroyer', 2),
    ]

    for (let i = 0; i < 10; i++) {
      const row = new Array(10).fill(null)
      this.tiles.push(row)
    }
  }

  resetTiles() {
    this.tiles = []

    for (let i = 0; i < 10; i++) {
      const row = new Array(10).fill(null)
      this.tiles.push(row)
    }
  }

  getTilesForShip(ship, startCoords, orientation) {
    const tiles = []

    for (let i = 0; i < ship.length; i++) {
      if (orientation === 'horizontal') {
        tiles.push([startCoords[0], startCoords[1] + i])
      } else {
        tiles.push([startCoords[0] + i, startCoords[1]])
      }
    }

    return tiles
  }

  canPlaceShip(ship, coords, orientation) {
    const [row, col] = coords

    if (
      (orientation == 'horizontal' && col + ship.length > 10) ||
      (orientation == 'vertical' && row + ship.length > 10)
    ) {
      return false // Out of bounds
    }

    for (let i = 0; i < ship.length; i++) {
      if (
        (orientation == 'horizontal' && this.tiles[row][col + i] !== null) ||
        (orientation == 'vertical' && this.tiles[row + i][col] !== null)
      ) {
        return false // Overlaps another ship
      }
    }

    return true // Ship can be placed
  }

  placeShip(ship, coords, orientation = 'horizontal') {
    const [row, col] = coords

    if (this.canPlaceShip(ship, coords, orientation)) {
      // Place ship
      for (let i = 0; i < ship.length; i++) {
        if (orientation == 'horizontal') {
          this.tiles[row][col + i] = ship
        } else {
          this.tiles[row + i][col] = ship
        }
      }
      return true // Ship placed successfully
    } else {
      return false // Ship not placed
    }
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
    this.ships.forEach((ship) => {
      this.placeShipRandomly(ship)
    })
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

  getAdjacentTiles([row, col]) {
    let adjacentTiles = [
      [row + 1, col],
      [row, col + 1],
      [row - 1, col],
      [row, col - 1],
    ].filter(([r, c]) => r >= 0 && r < 10 && c >= 0 && c < 10)

    // shuffle with Fisher-Yates (or Knuth) shuffle algorithm
    for (let i = adjacentTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[adjacentTiles[i], adjacentTiles[j]] = [
        adjacentTiles[j],
        adjacentTiles[i],
      ]
    }

    return adjacentTiles
  }

  isValidMove(row, col) {
    return (
      row >= 0 &&
      row < 10 &&
      col >= 0 &&
      col < 10 &&
      this.tiles[row][col] !== 'hit' &&
      this.tiles[row][col] !== 'miss'
    )
  }

  isHit(row, col) {
    return this.tiles[row][col] === 'hit'
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk())
  }

  allShipsPlaced() {
    return this.ships.every((ship) => ship.placed)
  }

  clearTiles(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }

  populate(container, shipPlacement = false) {
    this.clearTiles(container)

    this.tiles.forEach((row, rowIndex) => {
      row.forEach((tileContent, columnIndex) => {
        const newTile = document.createElement('div')
        newTile.classList.add('boardTile')
        newTile.setAttribute('data-row', rowIndex)
        newTile.setAttribute('data-column', columnIndex)
        newTile.setAttribute('role', 'gridcell')
        newTile.setAttribute(
          'aria-label',
          `Row ${rowIndex + 1}, Column ${columnIndex + 1}, ${tileContent ? (tileContent === 'hit' ? 'Hit' : 'Miss') : 'empty'}`
        )

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
          tileContent instanceof Ship &&
          shipPlacement === true
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
