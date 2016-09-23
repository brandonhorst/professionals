import _ from 'lodash'
import element from '../element'
import {canMove} from '../logic'

import actions from '../actions'
import turnStates from '../data/turn-states'
import activities from '../data/activity-data'
import jobData from '../data/job-data'

import {currentChar, charData} from '../helpers'

import style from '../style'

const selectMoveOption = (dispatch) => () => {
  dispatch({type: actions.SELECT_MOVE})
}

const selectActOption = (dispatch) => () => {
  dispatch({type: actions.SELECT_ACT})
}

const selectActivity = (dispatch, activity) => () => {
  dispatch({
    type: actions.SELECT_ACTIVITY,
    activity: activity
  })
}

const confirmActivity = (dispatch) => () => {
  dispatch({type: actions.CONFIRM_ACTIVITY})
}

const wait = (dispatch) => () => {
  dispatch({type: actions.SELECT_WAIT})
}

const cancel = (dispatch) => () => {
  dispatch({type: actions.CANCEL})
}

function showMove(context) {
  const movement = jobData[context.chars[context.turn.char].job].movement
  return context.turn.state === turnStates.MENU && canMove({state: context, movement})
}

function render ({props, dispatch, context}) {
  let items = []

  const coords = charData(context, currentChar(context)).coords
  const elevation = context.tiles[coords[0]][coords[1]].elevation

  if (context.turn.state === turnStates.MENU) {
    items.push(
      showMove(context) ? <li
        class='menu-item'
        style={style.menuItem(...coords, elevation, 'top')}
        onClick={selectMoveOption(dispatch)}>Move</li> : null,
      <li class='menu-item'
        style={style.menuItem(...coords, elevation, 'right')}
        onClick={selectActOption(dispatch)}>Act</li>,
      <li class='menu-item'
        style={style.menuItem(...coords, elevation, 'left')}
        onClick={wait(dispatch)}>Wait</li>
    )
  }

  if (context.turn.state === turnStates.SELECT_ACTIVITY) {
    const activityItems = _.map(jobData[context.chars[context.turn.char].job].activities, (activity, index) => {
      return (
        <li class='menu-item'
          style={style.menuItem(...coords, elevation, 'top')}
          onClick={selectActivity(dispatch, index)}>
          {activities[activity].name}
        </li>
      )
    })

    items.push(...activityItems)
  }

  if (context.turn.state !== turnStates.MENU) {
    items.push(<li class='menu-item'
      style={style.menuItem(...coords, elevation, 'left')}
      onClick={cancel(dispatch)}>Cancel</li>)
  }

  return (
    <ul class='menu'>
      {items}
    </ul>
  )
}

export default {
  render
}