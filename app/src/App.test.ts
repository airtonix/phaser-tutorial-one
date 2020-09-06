import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './App'

jest.mock('./Objects/Game', () => {
  return {
    PhaserGame: class {}
  }
})

describe('App', () => {
  it('renders', () => {
    const element = document.createElement('div')
    ReactDOM.render(React.createElement(App), element)
    ReactDOM.unmountComponentAtNode(element)
  })
})

