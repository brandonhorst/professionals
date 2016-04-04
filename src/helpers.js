import _ from 'lodash'
import dot from 'dot-prop-immutable'
import jobs from './data/job-data'

export function currentChar (state) {
  return state.turn.char
}

export function charData (state, char) {
  return state.chars[char]
}

export function jobForChar (state, char) {
  return jobs[charData(state, char).job]
}

export function chargeChar (state, char) {
  const speed = jobForChar(state, char).speed
  return () => dot.set(state, `chars.${char}.charge`, c => c + speed)
}

export function highestChargeChar (state) {
  const charObj = _.maxBy(state.chars, 'charge')
  return _.indexOf(state.chars, charObj)
}

export function damageCharPercent (state, char, percent) {
  const totalHealth = jobForChar(state, char).health
  const damage = totalHealth * percent

  return () => dot.set(state, `chars.${char}.health`, t => t - damage)
}

export function degradeStatus (state, char, statusType) {
  const status = charData(state, currentChar(state)).statuses[statusType]
  if (status.remainingTurns <= 1) {
    return () => dot.delete(state, `chars.${state.turn.char}.statuses.${statusType}`)
  } else {
    return () => dot.set(state, `chars.${state.turn.char}.statuses.${statusType}.remainingTurns`, t => t - 1)
  }
}