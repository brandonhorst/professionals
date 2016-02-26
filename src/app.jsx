import _ from 'lodash'
import {createApp} from 'deku'
import element from './element'
import {createStore} from 'redux'
import reducer from './reducer'
import Game from './comp/game'

// Create a Redux store to handle all UI actions and side-effects
const store = createStore(reducer)

// Create an app that can turn vnodes into real DOM elements
const render = createApp(document.getElementById('game'), store.dispatch)

render(<Game />, store.getState())
store.subscribe(() => {
  render(<Game />, store.getState())
})