import hitIcon from '../assets/bomb-explosion-svgrepo-com.svg'
import missIcon from '../assets/sea-water-svgrepo-com.svg'

const createHitIcon = () => {
  const newHitIcon = document.createElement('img')
  newHitIcon.src = hitIcon
  newHitIcon.alt = 'hit'
  newHitIcon.classList.add('boardIcon', 'hitIcon')
  newHitIcon.setAttribute('role', 'img')
  newHitIcon.setAttribute(
    'aria-label',
    'Bomb explosion indicating a successful hit'
  )
  return newHitIcon
}

const createMissIcon = () => {
  const newMissIcon = document.createElement('img')
  newMissIcon.src = missIcon
  newMissIcon.alt = 'miss'
  newMissIcon.classList.add('boardIcon', 'missIcon')
  newMissIcon.setAttribute('role', 'img')
  newMissIcon.setAttribute('aria-label', 'Water splash indicating a miss')

  return newMissIcon
}

export { createHitIcon, createMissIcon }
