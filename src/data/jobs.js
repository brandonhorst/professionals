import jobTypes from './job-types'
import movementTypes from './movement-types'
import activityTypes from './activity-types'

export default {
  [jobTypes.BRAWLER]: {
    name: 'Brawler',
    health: 140,
    movement: {type: movementTypes.NORMAL, range: 4},
    activities: [activityTypes.PUNCH]
  },
  [jobTypes.ARCHER]: {
    name: 'Archer',
    health: 100,
    movement: {type: movementTypes.NORMAL, range: 4},
    activities: [activityTypes.SHOOT_ARROW]
  },
  [jobTypes.SOLDIER]: {
    name: 'Soldier',
    health: 100,
    movement: {type: movementTypes.NORMAL, range: 4},
    activities: [
      activityTypes.SHOOT_GUN,
      activityTypes.GRENADE,
    ]
  },
  [jobTypes.WIZARD]: {
    name: 'Wizard',
    health: 80,
    movement: {type: movementTypes.NORMAL, range: 3},
    activities: [activityTypes.LIGHTNING]
  },
  [jobTypes.CLERIC]: {
    name: 'Cleric',
    health: 80,
    movement: {type: movementTypes.NORMAL, range: 3},
    activities: [activityTypes.HEAL]
  },
  [jobTypes.FIREMAN]: {
    name: 'Fireman',
    description: 'It was a pleasure to burn...',
    health: 100,
    movement: {type: movementTypes.NORMAL, range: 4},
    activities: [activityTypes.FLAMETHROWER]
  },
  [jobTypes.MODEL]: {
    name: 'Model',
    health: 70,
    movement: {type: movementTypes.NORMAL, range: 5},
    activities: [activityTypes.SEDUCE]
  }
}