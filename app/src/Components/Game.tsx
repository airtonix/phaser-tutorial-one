import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { PARENT_DIV_TAG } from '~/Config/phaser.config'
import { PreloaderScene } from '~/Scenes/PreloaderScene'
import { MenuScene } from '~/Scenes/MenuScene'
import { NewGameMenuScene } from '~/Scenes/NewGameMenuScene'
import { GameScene } from '~/Scenes/GameScene'
import { InterfaceScene } from '~/Scenes/InterfaceScene'
import { MapScene } from '~/Scenes/MapScene'
import config from '~/Config/phaser.config'

import css from './Game.css'

class PhaserGame extends Phaser.Game {

  constructor () {
    super(config)
    this.scene.add(PreloaderScene.key, PreloaderScene)
    this.scene.add(MenuScene.key, MenuScene)
    this.scene.add(NewGameMenuScene.key, NewGameMenuScene)
    this.scene.add(GameScene.key, GameScene)
    this.scene.add(InterfaceScene.key, InterfaceScene)
    this.scene.add(MapScene.key, MapScene)
    this.scene.start(PreloaderScene.key)
  }
}

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
