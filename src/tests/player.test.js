import Player from '../modules/player'

describe('Player class', () => {
  const computerPlayer = new Player('CP', 'AI')
  const humanPlayer = new Player('Sally')

  it('returns a player with the name it was passed', () => {
    expect(humanPlayer.name).toBe('Sally')
  })

  it('returns a human player when given just a name', () => {
    expect(humanPlayer.type).toBe('human')
  })

  it('returns a computer player when given correct param', () => {
    expect(computerPlayer.type).toBe('AI')
  })
})
