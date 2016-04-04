import element from '../element'
import s from '../style'

function render ({context}) {
  return (
    <ul class='status' style={s.status}>
      {/*<li class='status-item' style={s.statusItem}></li>*/}
    </ul>
  )
}

export default {
  render
}