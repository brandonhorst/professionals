const gridSize = 50;

export default {
  grid: {
    position: 'relative',
    top: '150px',
    left: '150px',
    width: `${10 * gridSize * 1.16}px`,
    height: `${10 * gridSize * 1.16}px`,
    WebkitUserSelect: 'none',
    // transform: 'rotate(60deg)',
    cursor: 'default'
  },

  gridItem: (x, y) => ({
    display: 'inline-block',
    width: '48px',
    height: '48px',
    position: 'absolute',
    border: '1px solid gray',
    left: `${x * gridSize}px`,
    // top: `${(y * gridSize * 1.16) - (x * gridSize / 1.5 / 1.16)}px`,
    top: `${(y * gridSize)}px`,
    fontSize: '75%',
    // transform: 'skew(0deg, -30deg) scale(1, 1.16)',
    fontFamily: '-apple-system, "Helvetica Neue", Helvetica',
    fontWeight: 600
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