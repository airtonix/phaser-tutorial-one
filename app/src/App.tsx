import 'reflect-metadata'
import React from 'react'

import { Store } from '~/Store'
import { Game } from '~/Components/Game'

import classes from './App.module.css'

export class App extends React.Component {
  render (): React.ReactNode {
    return (
      <div className={classes.App}>
        <Game />
      </div>
    )
  }
}
