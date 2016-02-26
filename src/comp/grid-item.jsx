import element from '../element'

import {canMoveTo, canHit, areaPowerModifierOn} from '../logic'
import actions from '../actions'
import s from '../style'

import Char from './char'

import activities from '../data/activity-data'
import turnStates from '../data/turn-states'
import jobs from '../data/jobs'

const moveTo = (dispatch, coords) => () => {
  dispatch({
    type: actions.MOVE_CHAR,
    coords
  })
}

const selectCoords = (dispatch, coords) => () => {
  dispatch({
    type: actions.SELECT_ACTIVITY_COORDS,
    coords
  })
}

const confirmActivity = (dispatch) => () => {
  dispatch({type: actions.CONFIRM_ACTIVITY})
}

function render ({props, dispatch, context}) {
  const chars = _.chain(context.chars)
    .filter(({coords}) => _.isEqual(coords, props.coords))
    .map(char => <Char char={char} />)
    .value()

  const style = s.gridItem(...props.coords)
  const events = {}
  const actingChar = context.chars[context.turn.char]

  if (_.isEqual(props.coords, context.chars[context.turn.char].coords)) {
    _.merge(style, s.isActiveTurn)
  }

  if (context.turn.state === turnStates.MOVE) {
    if (canMoveTo({
      state: context,
      movement: jobs[actingChar.job].movement,
      charCoords: actingChar.coords,
      toCoords: props.coords,
      chars: context.chars
    })) {
      _.merge(events, {onClick: moveTo(dispatch, props.coords, context.turn.char)})

      _.merge(style, s.canMoveTo)
    }
  }

  if (context.turn.state === turnStates.SELECT_COORDS || context.turn.state === turnStates.CONFIRM_ACTIVITY) {
    if (canHit({
      state: context,
      activityRange: activities[jobs[actingChar.job].activities[context.turn.activity]].range,
      charCoords: actingChar.coords,
      toCoords: props.coords
    })) {
      _.merge(events, {onMouseOver: selectCoords(dispatch, props.coords, context.turn.char)})

      _.merge(style, s.canActOn)
    }
  }

  if (context.turn.state === turnStates.CONFIRM_ACTIVITY) {
    if (areaPowerModifierOn({
      state: context,
      activityArea: activities[jobs[actingChar.job].activities[context.turn.activity]].area,
      charCoords: actingChar.coords,
      focusCoords: context.turn.coords,
      atCoords: props.coords
    }) > 0) {
      _.merge(events, {onClick: confirmActivity(dispatch, props.coords, context.turn.char)})

      _.merge(style, s.canConfirm)
    }
  }

  return (
    <div class='grid-item' key={props.coords} style={style} {...events}>
      {chars}
    </div>
  )
}

export default {
  render
}