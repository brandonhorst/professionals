import element from '../element'
import jobData from '../data/job-data'
import s from '../style'

function render ({props, context}) {
  const char = context.chars[props.index]
  const coords = char.coords
  const elevation = context.tiles[coords[0]][coords[1]].elevation
  return (
    <div class={`char team-${char.team}`} style={s.char(...char.coords, elevation)}/>
  )
}

export default {
  render
}

/*
        {jobData[char.job].name}
      <br />
      {Math.ceil(char.health / jobData[char.job].health * 100)}%
      <br />
      {_.keys(char.statuses).join(', ')}

*/