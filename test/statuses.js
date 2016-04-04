import {expect} from 'chai'

import jobTypes from '../src/data/job-types'
import statusTypes from '../src/data/status-types'
import statusData from '../src/data/status-data'

describe('statuses', () => {
  describe('POISON', () => {
    const status = statusData[statusTypes.POISON]
    it('hurts a char on its turn', () => {
      const state = {
        turn: {char: 0},
        chars: [{
          job: jobTypes.SOLDIER,
          health: 100
        }]
      }
      const newState = status.onTurnBegin({state})()

      expect(newState.chars[0].health).to.equal(87.5)
    })
  })

  describe('INFATUATE', () => {
    const status = statusData[statusTypes.INFATUATE]
    it('degrades', () => {
      const state = {
        turn: {char: 0},
        chars: [{
          statuses: {
            [statusTypes.INFATUATE]: {
              remainingTurns: 2
            }
          }
        }]
      }

      const newState1 = status.onTurnBegin({state})()
      expect(newState1.chars[0].statuses[statusTypes.INFATUATE].remainingTurns).to.equal(1)

      const newState2 = status.onTurnBegin({state: newState1})()
      expect(newState2.chars[0].statuses).to.eql({})
    })
  })
})