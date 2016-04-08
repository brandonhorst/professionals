import element from '../element'
import GridItem from './grid-item'
import Char from './char'

function render ({context}) {
  return (
    <div class='grid'>
      {_.times(context.grid[0], (x) => {
        return _.times(context.grid[1], (y) => {
          return <GridItem coords={[x, y]} elevation={context.tiles[x][y].elevation} />
        })
      })}
      {_.map(context.chars, (char, index) => {
        return <Char index={index} />
      })}
    </div>
  )
}

export default {
  render
}