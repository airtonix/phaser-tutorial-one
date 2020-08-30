import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './App'

describe('App', () => {
  it('renders', () => {
    const element = document.createElement('div')
    ReactDOM.render(React.createElement(App), element)
    ReactDOM.unmountComponentAtNode(element)
  })
})

