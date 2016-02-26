import _ from 'lodash'
import dot from 'dot-prop-immutable'
import actions from './actions'
import {mergeObj} from './utils'
import {applyEffects, handleTurnStart, areaPowerModifierOn} from './logic'

import activityData from './data/activity-data'
import jobTypes from './data/job-types'
import jobs from './data/jobs'
import turnStates from './data/turn-states'
import turnPhases from './data/turn-phases'

const initialState = {
  grid: [10, 10],
  teams: [
    {name: 'Team Awesome'},
    {name: 'Team Brandon'}
  ],
  turn: {
    team: 0,
    char: 0,
    state: turnStates.MENU,
    phases: []
  },
  chars: [{
    job: jobTypes.BRAWLER,
    team: 0,
    statuses: {},
    coords: [3, 3],
    health: 140
  }, {
    job: jobTypes.WIZARD,
    team: 1,
    statuses: {},
    coords: [6, 6],
    health: 80
  }, {
    job: jobTypes.ARCHER,
    team: 0,
    statuses: {},
    coords: [3, 4],
    health: 100
  }, {
    job: jobTypes.FIREMAN,
    team: 1,
    statuses: {},
    coords: [6, 5],
    health: 100
  }, {
    job: jobTypes.SOLDIER,
    team: 0,
    statuses: {},
    coords: [3, 5],
    health: 100
  }, {
    job: jobTypes.BRAWLER,
    team: 1,
    statuses: {},
    coords: [6, 4],
    health: 140
  }, {
    job: jobTypes.MODEL,
    team: 0,
    statuses: {},
    coords: [3, 6],
    health: 70
  }]
}

function startTurn(state) {
  const merged = mergeObj(state, {
    turn: {
      team: ((state.turn.team + 1) % state.teams.length),
      char: ((state.turn.char + 1) % state.chars.length),
      state: turnStates.MENU,
      phases: []
    }
  })

  return handleTurnStart({state: merged})
}

function endTurn(state) {
  return mergeObj(state, {
    turn: {
      state: turnStates.BETWEEN_TURNS,
    }
  })
}

export default function reduce (state = initialState, action) {
  switch(action.type) {
    case actions.SELECT_MOVE: 
      return mergeObj(state, {turn: {state: turnStates.MOVE}})
    case actions.SELECT_ACT:
      return mergeObj(state, {turn: {state: turnStates.SELECT_ACTIVITY}})
    case actions.SELECT_WAIT:
      return endTurn(state)
    case actions.SELECT_ACTIVITY:
      return mergeObj(state, {
        turn: {state: turnStates.SELECT_COORDS, activity: action.activity}
      })
    case actions.SELECT_ACTIVITY_COORDS:
      return mergeObj(state, {turn: {state: turnStates.CONFIRM_ACTIVITY, coords: action.coords}})
    case actions.CANCEL:
      return mergeObj(state, {turn: {state: turnStates.MENU}})
    case actions.MOVE_CHAR:
      return mergeObj(state, {
        chars: {
          [state.turn.char]: {coords: action.coords}
        },
        turn: {
          state: turnStates.MENU,
          phases: state.turn.phases.concat(turnPhases.MOVE)
        }
      })
    case actions.START_NEXT_TURN:
      return startTurn(state)

    case actions.CONFIRM_ACTIVITY:
      let newState = state
      const activity = activityData[jobs[state.chars[state.turn.char].job].activities[state.turn.activity]]
      const charModifications = {}

      for (let x = 0; x < state.grid[0]; x++) {
        for (let y = 0; y < state.grid[1]; y++) {
          // compute area effect for this square
          const effectPowerModifier = areaPowerModifierOn({
            state,
            activityArea: activity.area,
            charCoords: state.chars[state.turn.char].coords,
            focusCoords: state.turn.coords,
            atCoords: [x, y]
          })

          if (effectPowerModifier) {
            _.forEach(state.chars, (char, index) => {
              if (_.isEqual(char.coords, [x, y])) {
                newState = applyEffects({
                  state: newState,
                  effects: activity.effects,
                  effectPowerModifier,
                  charId: index
                })
              }
            })
          }
        }
      }
      return endTurn(newState)

    default: 
      return state
  }
}