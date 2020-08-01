import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './App'
import Models from './core/models'
// import Game from './components/Game'

it('renders React without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})


// This fails due to a canvan error
// it("renders Phaser without crashing", () => {
//   const div = document.createElement("div")
//   ReactDOM.render(<Game />, div)
//   ReactDOM.unmountComponentAtNode(div)
// })