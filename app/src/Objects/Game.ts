import { PreloaderScene } from '~/Scenes/PreloaderScene'
import { MenuScene } from '~/Scenes/MenuScene'
import { NewGameMenuScene } from '~/Scenes/NewGameMenuScene'
import { GameScene } from '~/Scenes/GameScene'
import { InterfaceScene } from '~/Scenes/InterfaceScene'
import { MapScene } from '~/Scenes/MapScene'
import config from '~/Config/phaser.config'

export class PhaserGame extends Phaser.Game {

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
