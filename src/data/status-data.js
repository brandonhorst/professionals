import dot from  'dot-prop-immutable'

import statusTypes from './status-types'

import {currentChar, damageCharPercent, degradeStatus} from '../helpers'

export default {
  [statusTypes.INFATUATE]: {
    onTurnBegin({state}) {
      return degradeStatus(state, currentChar(state), statusTypes.INFATUATE)
    }
  },
  [statusTypes.POISON]: {
    onTurnBegin({state}) {
      return damageCharPercent(state, currentChar(state), 0.125)
    }
  }
}