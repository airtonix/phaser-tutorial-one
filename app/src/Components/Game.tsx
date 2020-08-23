import React, { Component } from 'react'
import Phaser from 'phaser'
import { classes } from 'polytype'

import config, { PARENT_DIV_TAG } from '~/Config/phaser.config'
import { PreloaderScene } from '~/Scenes/PreloaderScene'
import { MenuScene } from '~/Scenes/MenuScene'
import { WritesLogs } from '~/Mixins/WritesLogs'
import { NewGameMenuScene } from '~/Scenes/NewGameMenuScene'
import { GameScene } from '~/Scenes/GameScene'
import { InterfaceScene } from '~/Scenes/InterfaceScene'
import { MapScene } from '~/Scenes/MapScene'

import css from './Game.css'

const PolyBase = classes(
  Phaser.Game,
  WritesLogs,
)
const PolyBaseWrapper = function (...args: any[]) {
  return new PolyBase(...args)
} as unknown as typeof PolyBase

class PhaserGame extends PolyBaseWrapper {
  constructor () {
    super(
      [config],
      [{ key: 'Game' }]
    )
    this.scene.add(PreloaderScene.key, PreloaderScene)
    this.scene.add(MenuScene.key, MenuScene)
    this.scene.add(NewGameMenuScene.key, NewGameMenuScene)
    this.scene.add(GameScene.key, GameScene)
    this.scene.add(InterfaceScene.key, InterfaceScene)
    this.scene.add(MapScene.key, MapScene)
    this.log('Starting')
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
          className={css.block}
          id={PARENT_DIV_TAG}
        />
      )
    }
}
