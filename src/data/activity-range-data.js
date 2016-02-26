import {crowFliesDistance, linearDistance} from '../utils'
import activityRangeTypes from './activity-range-types'

export default {
  [activityRangeTypes.ADJACENT]: {
    canHit({charCoords, toCoords}) {
      const distance = crowFliesDistance(charCoords, toCoords)
      return distance === 1
    }
  },
  [activityRangeTypes.RANGED]: {
    canHit({activityRange, charCoords, toCoords}) {
      const distance = crowFliesDistance(charCoords, toCoords)
      return distance <= activityRange.range && distance > 1
    }
  },
  [activityRangeTypes.LINE]: {
    canHit({activityRange, charCoords, toCoords}) {
      const distance = linearDistance(charCoords, toCoords)
      return distance > 0 && distance <= activityRange.range
    }
  }
}
