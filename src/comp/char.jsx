import _ from 'lodash'
import element from '../element'
import jobs from '../data/jobs'
import s from '../style'

function render ({props, context}) {
  return (
    <div style={s.team(props.char.team)}>
      {jobs[props.char.job].name}
      <br />
      {Math.ceil(props.char.health / jobs[props.char.job].health * 100)}%
      <br />
      {_.keys(props.char.statuses).join(', ')}
    </div>
  )
}

export default {
  render
}