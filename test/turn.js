import {expect} from 'chai'

import actions from '../src/actions'
import jobTypes from '../src/data/job-types'
import reducer from '../src/reducer'

describe('turns', () => {
  describe('startTurn', () => {
    it('increments charge', () => {
      const state = {
        turn: {
          char: 0
        },
        chars: [{
          job: jobTypes.BRAWLER, //100
          charge: 200
        }, {
          job: jobTypes.ARCHER, //110
          charge: 800
        }]
      }
      const newState = reducer(state, {type: actions.START_NEXT_TURN})
      // console.log(newState)

      expect(newState.turn.char).to.eql(1)
      expect(newState.chars[0].charge).to.equal(400)
      expect(newState.chars[1].charge).to.equal(1020)

    })
  })
})
