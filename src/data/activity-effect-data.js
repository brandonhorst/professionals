import dot from 'dot-prop-immutable'
import effectTypes from './activity-effect-types'
import statusTypes from './status-types'
import jobData from './job-data'

export default {
  [effectTypes.DAMAGE]: {
    hitChar({state, effectPowerModifier, charId, effect}) {
      return () => dot.set(state, `chars.${charId}.health`, health => {
        return Math.max(health - (effect.power * effectPowerModifier), 0)
      })
    }
  },
  [effectTypes.HEAL]: {
    hitChar({state, effectPowerModifier, charId, effect}) {
      const char = state.chars[charId]
      return () => dot.set(state, `chars.${charId}.health`, health => {
        return Math.min(health + (effect.power * effectPowerModifier), jobData[char.job].health)
      })
    }
  },
  [effectTypes.INFATUATE]: {
    hitChar({state, effectPowerModifier, charId}) {
      return () => dot.set(state, `chars.${charId}.statuses.${statusTypes.INFATUATE}`, {
        remainingTurns: (effectPowerModifier * 2) + 1
      })
    }
  }
}
