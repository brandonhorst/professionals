import _ from 'lodash'
import dot from 'dot-prop-immutable'
import turnPhases from './data/turn-phases'
import {mergeObj} from './utils'

import activityRangeData from './data/activity-range-data'
import activityAreaData from './data/activity-area-data'
import activityEffectData from './data/activity-effect-data'
import statusData from './data/status-data'
import movementData from './data/movement-data'
import movementTypes from './data/movement-types'

export function canMoveTo({state, movement, charCoords, toCoords}) {
  return movementData[movement.type].canMoveTo({state, movement, charCoords, toCoords})
}

export function canMove({state, movement}) {
  return movementData[movement.type].moveIsAvailable({state, movement})
}

export function canHit({state, activityRange, charCoords, toCoords}) {
  return activityRangeData[activityRange.type].canHit({state, activityRange, charCoords, toCoords})
}

export function applyEffects({state, effects, effectPowerModifier, charId}) {
  return _.reduce(effects, (newState, effect, effectType) => {
    const hitChar = activityEffectData[effect.type].hitChar
    if (hitChar) {
      return hitChar({state: newState, effectPowerModifier, charId, effect})()
    } else {
      return newState
    }
  }, state)
}

export function areaPowerModifierOn({state, activityArea, charCoords, focusCoords, atCoords}) {
  return activityAreaData[activityArea.type].getEffectPowerModifier({
    state,
    activityArea,
    charCoords,
    focusCoords,
    atCoords
  })
}

export function handleTurnStart ({state}) {
  const char = state.chars[state.turn.char]

  return _.reduce(char.statuses, (newState, status, statusType) => {
    const onTurnBegin = statusData[statusType].onTurnBegin || (() => newState)
    return onTurnBegin({state: newState})()
  }, state)
}
