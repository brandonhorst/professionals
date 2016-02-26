import _ from 'lodash'
import {crowFliesDistance} from '../utils'
import movementTypes from './movement-types'
import turnPhases from './turn-phases'

export default {
  [movementTypes.NORMAL]: {
    canMoveTo({state, movement, charCoords, toCoords}) {
      const distance = crowFliesDistance(charCoords, toCoords)
      if (distance > movement.range || distance === 0) {
        return false
      }
      return !_.some(state.chars, ({coords}) => _.isEqual(toCoords, coords))
    },
    moveIsAvailable({state}) {
      return !_.includes(state.turn.phases, turnPhases.MOVE)
    }
  }
}
