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

  menu: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    border: '1px solid red',
    width: '200px'
  },

  menuItem: {
    height: '100px',
    border: '1px solid black',
    cursor: 'pointer'
  },

  status: {
    border: '1px solid green',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },

  statusItem: {

  }
}