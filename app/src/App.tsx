import 'reflect-metadata'
import React from 'react'
import { Provider } from 'mobx-react'

import { Store } from '~/Store'
import { Game } from '~/Components/Game'

import classes from './App.module.css'

export function App () : React.ReactElement {
  return (
    <Provider store={Store}>
      <div className={classes.App}>
        <Game />
      </div>
    </Provider>
  )
}
