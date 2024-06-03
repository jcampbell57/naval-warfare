import Ship from '../modules/ship'

describe('Ship class', () => {
  it('returns ship of specified length', () => {
    const threeShip = new Ship(3)
    expect(threeShip.length).toBe(3)
  })

  it('correctly accounts for one hit', () => {
    const threeShip = new Ship(3)
    threeShip.hit()
    expect(threeShip.hits).toBe(1)
  })

  it('correctly accounts for two hits', () => {
    const threeShip = new Ship(3)
    threeShip.hit()
    threeShip.hit()
    expect(threeShip.hits).toBe(2)
  })

  it('knows a ship with a length of two is sunk after two hits', () => {
    const twoShip = new Ship(2)
    twoShip.hit()
    twoShip.hit()
    expect(twoShip.isSunk()).toBe(true)
  })

  it('knows a ship with a length of three is not sunk after two hits', () => {
    const threeShip = new Ship(3)
    threeShip.hit()
    threeShip.hit()
    expect(threeShip.isSunk()).toBe(false)
  })

  it('knows a ship with a length of three is sunk after three hits', () => {
    const threeShip = new Ship(3)
    threeShip.hit()
    threeShip.hit()
    threeShip.hit()
    expect(threeShip.isSunk()).toBe(true)
  })

  it('will not allow a sunk ship to be hit', () => {
    const twoShip = new Ship(2)
    twoShip.hit()
    twoShip.hit()
    twoShip.hit()
    expect(twoShip.hits).toBe(2)
  })
})
