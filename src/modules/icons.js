import hitIcon from '../assets/bomb-explosion-svgrepo-com.svg'
import missIcon from '../assets/sea-water-svgrepo-com.svg'

const createHitIcon = () => {
  const newHitIcon = document.createElement('img')
  newHitIcon.src = hitIcon
  newHitIcon.classList.add('boardIcon', 'hitIcon')
  return newHitIcon
}

const createMissIcon = () => {
  const newMissIcon = document.createElement('img')
  newMissIcon.src = missIcon
  newMissIcon.classList.add('boardIcon', 'missIcon')
  return newMissIcon
}

export { createHitIcon, createMissIcon }
