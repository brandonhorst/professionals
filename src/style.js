const gridSize = 50;

export default {
  gridItem: (x, y, z) => ({
    left: `${x * 3}em`,
    top: `${y * 3}em`,
    transform: `translateZ(${z}em)`
  }),

  char: (x, y, z) => ({
    left: `${x * 3 + 1}em`,
    top: `${y * 3 + 1}em`,
    transform: `translateZ(${z + 1}em)`
  }),

  canMoveTo: {
    backgroundColor: '#FFFFCC',
    cursor: 'pointer'
  },

  canActOn: {
    backgroundColor: '#FFCCCC',
    cursor: 'pointer'
  },

  canConfirm: {
    backgroundColor: '#CCFFCC',
    cursor: 'pointer'
  },

  isActiveTurn: {
    backgroundColor: '#FFCCFF'
  },

  team: (team) => ({
    color: team === 0 ? 'blue' : 'red'
  }),

  menuItem(x, y, z, pos) {
    let left = x * 3
    let top = y * 3 + 1
    switch (pos) {
      case 'left': left -= 4; break
      case 'right': left += 4; break
      case 'top': top -= 3; break
    }
    return {
      left: `${left}em`,
      top: `${top}em`,
      transform: `translateZ(${z}em)`
    }
  },

  status: {
    border: '1px solid green',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
}