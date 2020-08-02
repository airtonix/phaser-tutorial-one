import * as React from 'react'

import '~/Store'

import classes from './App.module.css'

import { Game } from '~/Components/Game'


export class App extends React.Component {
  render (): React.ReactNode {
    return (
      <div className={classes.App}>
        <Game />
      </div>
    )
  }
}
