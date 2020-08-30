import React from 'react'
import ReactDOM from 'react-dom'

import { Game } from './Game'

it('renders Phaser without crashing', () => {
  const element = document.createElement('div')
  ReactDOM.render(React.createElement(Game), element)
  ReactDOM.unmountComponentAtNode(element)
})
