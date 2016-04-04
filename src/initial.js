import _ from 'lodash'
import jobTypes from './data/job-types'
import turnStates from './data/turn-states'
import {create} from 'random-seed'

const random = create(0)

const tiles = _.range(11).map(() => {
  return _.range(11).map(() => {
    return {
      type: 'normal',
      elevation: random(3)
    }
  })
})

export default {
  grid: [11, 11],
  tiles,
  teams: [
    {name: 'Team Awesome'},
    {name: 'Team Brandon'}
  ],
  turn: {
    char: 0,
    state: turnStates.MENU,
    phases: []
  },
  chars: [{
    job: jobTypes.BRAWLER,
    team: 0,
    statuses: {},
    coords: [3, 3],
    health: 140,
    charge: 0
  }, {
    job: jobTypes.WIZARD,
    team: 1,
    statuses: {},
    coords: [6, 6],
    health: 80,
    charge: 0
  }, {
    job: jobTypes.ARCHER,
    team: 0,
    statuses: {},
    coords: [3, 4],
    health: 100,
    charge: 0
  }, {
    job: jobTypes.FIREMAN,
    team: 1,
    statuses: {},
    coords: [6, 5],
    health: 100,
    charge: 0
  }, {
    job: jobTypes.SOLDIER,
    team: 0,
    statuses: {},
    coords: [3, 5],
    health: 100,
    charge: 0
  }, {
    job: jobTypes.BRAWLER,
    team: 1,
    statuses: {},
    coords: [6, 4],
    health: 140,
    charge: 0
  }, {
    job: jobTypes.MODEL,
    team: 0,
    statuses: {},
    coords: [3, 6],
    health: 70,
    charge: 0
  }]
}