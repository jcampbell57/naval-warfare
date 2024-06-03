const Gameboard = require('../modules/gameboard')
const Ship = require('../modules/ship')

describe('Gameboard class', () => {
  it('returns an empty gameboard', () => {
    const testBoard = new Gameboard()
    expect(testBoard.squares).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ])
  })

  it('placeShip() places the correct ship in the correct location', () => {
    const testBoard = new Gameboard()
    const testShip = new Ship(1)
    testBoard.placeShip(testShip, [0, 0])
    expect(testBoard.squares[0][0]).toBe(testShip)
  })

  it('placeShip() does not allow a ship to be placed out of bounds', () => {
    const testBoard = new Gameboard()
    const testShip = new Ship(5)
    const result = testBoard.placeShip(testShip, [0, 8])
    expect(result).toBe('Out of bounds.')
  })

  it('placeShip() does not allow a ship to be placed over another ship', () => {
    const testBoard = new Gameboard()
    const testShip1 = new Ship(1)
    const testShip2 = new Ship(2)
    testBoard.placeShip(testShip1, [0, 0])
    const result = testBoard.placeShip(testShip2, [0, 0])
    expect(result).toBe('Overlaps another ship.')
  })

  it('receiveAttack() records a missed shot', () => {
    const testBoard = new Gameboard()
    testBoard.receiveAttack([1, 1])
    expect(testBoard.squares[1][1]).toBe('miss')
  })

  it('receiveAttack() can determine when a ship is hit', () => {
    const testBoard = new Gameboard()
    const testShip = new Ship(1)
    testBoard.placeShip(testShip, [0, 0])
    testBoard.receiveAttack([0, 0])
    expect(testBoard.squares[0][0]).toBe('hit')
  })

  it('receiveAttack() can determine which ship has been hit', () => {
    const testBoard = new Gameboard()
    const testShip = new Ship(1)
    testBoard.placeShip(testShip, [0, 0])
    testBoard.receiveAttack([0, 0])
    expect(testShip.hits).toBe(1)
  })

  it('does not allow a ship to be hit in the same spot twice', () => {
    const testBoard = new Gameboard()
    const testShip = new Ship(2)
    testBoard.placeShip(testShip, [0, 0])
    testBoard.receiveAttack([0, 0])
    testBoard.receiveAttack([0, 0])
    expect(testShip.hits).toBe(1)
  })

  it('allShipsSunk() returns true when all ships are sunk', () => {
    const testBoard = new Gameboard()
    const testShip = new Ship(1)
    testBoard.placeShip(testShip, [0, 0])
    testBoard.receiveAttack([0, 0])
    expect(testBoard.allShipsSunk()).toBe(true)
  })

  it('allShipsSunk() returns false when all ships are not sunk', () => {
    const testBoard = new Gameboard()
    const testShip = new Ship(2)
    testBoard.placeShip(testShip, [0, 0])
    testBoard.receiveAttack([0, 0])
    expect(testBoard.allShipsSunk()).toBe(false)
  })
})
