import element from '../element'
import GridItem from './grid-item'
import s from '../style'

function render ({context}) {
  return (
    <div class='grid' style={s.grid}>
      {_.times(context.grid[0], (x) => {
        return _.times(context.grid[1], (y) => {
          return <GridItem coords={[x, y]} />
        })
      })}
    </div>
  )
}

export default {
  render
}