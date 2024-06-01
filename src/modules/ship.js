class Ship {
  constructor(length) {
    this.length = length
    this.hits = 0
    this.sunk = false
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
