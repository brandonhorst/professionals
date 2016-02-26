import dot from  'dot-prop-immutable'

import statusTypes from './status-types'

export default {
  [statusTypes.INFATUATED]: {
    onTurnBegin({state}) {
      console.log(state)
      const status = state.chars[state.turn.char].statuses[statusTypes.INFATUATED]
      if (status.remainingTurns <= 1) {
        return () => dot.delete(state, `chars.${state.turn.char}.statuses.${statusTypes.INFATUATED}`)
      } else {
        return () => dot.set(state, `chars.${state.turn.char}.statuses.${statusTypes.INFATUATED}.remainingTurns`, t => t - 1)
      }
    }
  }
}