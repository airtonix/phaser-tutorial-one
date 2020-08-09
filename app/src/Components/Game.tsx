/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Phaser from 'phaser'

import config, { PARENT_DIV_TAG } from '~/Config/phaser.config'
import { PreloaderScene } from '~/Scenes/PreloaderScene'
import { MenuScene } from '~/Scenes/MenuScene'
import { GameScene } from '~/Scenes/GameScene'
import { LevelOneScene } from '~/Scenes/LevelOneScene'
import { InterfaceScene } from '~/Scenes/InterfaceScene'
import { MapScene } from '~/Scenes/MapScene'

import classes from './Game.css'

class PhaserGame extends Phaser.Game {

  constructor () {
    super(config)
    this.scene.add(PreloaderScene.key, PreloaderScene)
    this.scene.add(MenuScene.key, MenuScene)
    this.scene.add(GameScene.key, GameScene)
    this.scene.add(InterfaceScene.key, InterfaceScene)
    this.scene.add(MapScene.key, MapScene)
    this.scene.start(PreloaderScene.key)
  }
}

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
          className={classes.block}
          id={PARENT_DIV_TAG}
        />
      )
    }
}
