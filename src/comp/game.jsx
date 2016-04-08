import element from '../element'
import Grid from './grid'
import actions from '../actions'
import Menu from './menu'

import turnStates from '../data/turn-states'

function onUpdate({dispatch, context}) {
  if (context.turn.state === turnStates.BETWEEN_TURNS) {
    process.nextTick(() => dispatch({type: actions.START_NEXT_TURN}))
  }
}

function render () {
  return (
    <div class='game'>
      <Grid />
      <Menu />
    </div>
  )
}

export default {
  onUpdate,
  render
}