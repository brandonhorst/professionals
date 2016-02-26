import activityRangeTypes from './activity-range-types'
import activityEffectTypes from './activity-effect-types'
import activityAreaTypes from './activity-area-types'
import activityTypes from './activity-types'

export default {
  [activityTypes.PUNCH]: {
    name: 'Punch',
    range: {type: activityRangeTypes.ADJACENT},
    area: {type: activityAreaTypes.NONE},
    effects: [{type: activityEffectTypes.DAMAGE, power: 20}]
  },
  [activityTypes.SHOOT_ARROW]: {
    name: 'Shoot',
    range: {type: activityRangeTypes.RANGED, range: 6},
    area: {type: activityAreaTypes.NONE},
    effects: [{type: activityEffectTypes.DAMAGE, power: 15}]
  },
  [activityTypes.SHOOT_GUN]: {
    name: 'Shoot',
    range: {type: activityRangeTypes.RANGED, range: 6},
    area: {type: activityAreaTypes.NONE},
    effects: [{type: activityEffectTypes.DAMAGE, power: 15}]
  },
  [activityTypes.GRENADE]: {
    name: 'Grenade',
    range: {type: activityRangeTypes.RANGED, range: 4},
    area: {type: activityAreaTypes.CROSS},
    effects: [{type: activityEffectTypes.DAMAGE, power: 20}]
  },
  [activityTypes.LIGHTNING]: {
    name: 'Lightning',
    range: {type: activityRangeTypes.RANGED, range: 4},
    area: {type: activityAreaTypes.CROSS},
    effects: [{type: activityEffectTypes.DAMAGE, power: 20}]
  },
  [activityTypes.HEAL]: {
    name: 'Heal',
    range: {type: activityRangeTypes.RANGED, range: 4},
    area: {type: activityAreaTypes.CROSS},
    effects: [{type: activityEffectTypes.HEAL, power: 20}]
  },
  [activityTypes.FLAMETHROWER]: {
    name: 'Flamethrower',
    range: {type: activityRangeTypes.LINE, range: 4},
    area: {type: activityAreaTypes.LINE, range: 4},
    effects: [{type: activityEffectTypes.DAMAGE, power: 20}]
  },
  [activityTypes.SEDUCE]: {
    name: 'Seduce',
    range: {type: activityRangeTypes.RANGED, range: 4},
    area: {type: activityAreaTypes.NONE, range: 4},
    effects: [{type: activityEffectTypes.INFATUATE}]
  }
}
