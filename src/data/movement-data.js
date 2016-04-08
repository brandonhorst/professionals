import _ from 'lodash'
import {crowFliesDistance} from '../utils'
import movementTypes from './movement-types'
import turnPhases from './turn-phases'
import aStar from 'a-star'

function coordFree (state, toCoords) {
  return !_.some(state.chars, ({coords}) => _.isEqual(toCoords, coords))
}

function inBounds (state, toCoords) {
  return toCoords[0] >= 0 && toCoords[1] >= 0 &&
    toCoords[0] < state.grid[0] && toCoords[1] < state.grid[1]
}

export default {
  [movementTypes.NORMAL]: {
    canMoveTo({state, movement, charCoords, toCoords}) {
      // We don't need to use A* if the absolute distance is more than
      //  movement.range chars away - but it doesn't matter for small boards
      const options = {
        start: charCoords,
        isEnd(node) { return _.isEqual(node, toCoords) },
        neighbor(node) {
          return _.filter([
            [node[0] - 1, node[1]],
            [node[0] + 1, node[1]],
            [node[0], node[1] - 1],
            [node[0], node[1] + 1]
          ], (newNode) => inBounds(state, newNode) && coordFree(state, newNode))
        },
        distance () { return 1 },
        heuristic () { return 1 }
      }

      if (_.isEqual(charCoords, toCoords)) {
        return false
      } else {
        const result = aStar(options)
        return result.status === 'success' &&
          result.path.length <= movement.range + 1
      }

      // const distance = crowFliesDistance(charCoords, toCoords)
      // if (distance > movement.range || distance === 0) {
      //   return false
      // }
      // return coordFree(state, toCoords)
    },
    moveIsAvailable({state}) {
      return !_.includes(state.turn.phases, turnPhases.MOVE)
    }
  }
}
