import _ from 'lodash'
import {crowFliesDistance, linearDistance} from '../utils'
import activityAreaTypes from './activity-area-types'

export default {
  [activityAreaTypes.NONE]: {
    getEffectPowerModifier({focusCoords, atCoords}) {
      return _.isEqual(focusCoords, atCoords) ? 1 : 0;
    }
  },
  [activityAreaTypes.CROSS]: {
    getEffectPowerModifier({focusCoords, atCoords}) {
      const distance = crowFliesDistance(focusCoords, atCoords)
      switch (distance) {
        case 0: return 1
        case 1: return 0.75
        default: return 0
      }
    }
  },
  [activityAreaTypes.LINE]: {
    getEffectPowerModifier({activityArea, charCoords, focusCoords, atCoords}) {
      if (charCoords[0] === focusCoords[0]) {
        if (charCoords[1] > focusCoords[1]) {
          return atCoords[0] === charCoords[0]
            && atCoords[1] >= charCoords[1] - activityArea.range
            && atCoords[1] < charCoords[1]
        } else if  (charCoords[1] < focusCoords[1]) {
          return atCoords[0] === charCoords[0]
            && atCoords[1] <= charCoords[1] + activityArea.range
            && atCoords[1] > charCoords[1]
        }
      } else if (charCoords[1] === focusCoords[1]) {
        if (charCoords[0] > focusCoords[0]) {
          return atCoords[1] === charCoords[1]
            && atCoords[0] >= charCoords[0] - activityArea.range
            && atCoords[0] < charCoords[0]
        } else if  (charCoords[0] < focusCoords[0]) {
          return atCoords[1] === charCoords[1]
            && atCoords[0] <= charCoords[0] + activityArea.range
            && atCoords[0] > charCoords[0]
        }
      }
    }
  }
}
