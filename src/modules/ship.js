class Ship {
  constructor(name, length) {
    this.name = name
    this.length = length
    this.hits = 0
    this.sunk = false
    this.selected = false
    this.placed = false
    this.orientation = 'horizontal'
  }

  updateSunkStatus() {
    if (this.hits == this.length) {
      this.sunk = true
    }
  }

  hit() {
    if (this.hits < this.length) {
      this.hits += 1
      this.updateSunkStatus()
    }
  }

  isSunk() {
    return this.sunk
  }
}

export default Ship
