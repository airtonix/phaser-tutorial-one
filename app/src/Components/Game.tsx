import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { PARENT_DIV_TAG } from '~/Config/phaser.config'
import { PhaserGame } from '~/Objects/Game'

import css from './Game.css'

@inject('store')
@observer
export class Game extends Component {
    game: PhaserGame

    componentDidMount (): void {
      this.game = new PhaserGame()
    }

    shouldComponentUpdate (): boolean {
      return false
    }

    render (): React.ReactNode {
      return (
        <div
          className={css.block}>
          <div
            className={css.game}
            id={PARENT_DIV_TAG}
          />
        </div>
      )
    }
}
