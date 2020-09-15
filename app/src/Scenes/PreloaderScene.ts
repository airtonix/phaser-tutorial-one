import { NumberBar, RoundRectangle } from 'phaser3-rex-plugins/templates/ui/ui-components';

import { Logger } from '~/Core/Logger'
import {
  SpriteSheets,
  Images,
  TiledTileMaps,
  Animations,
  BitmapFonts,
  IAnimationSheetConfig,
  ITiledTileMapConfig,
  IBitmapFont,
} from '~/Config/constants'

import { MenuScene } from './MenuScene'

interface IAssetCollection {
    [key: string]: any
}

const log = Logger(module.id)

export class PreloaderScene extends Phaser.Scene {
    static key = 'PreloaderScene'

    static COLOR_WHITE = 0xffffff
    static COLOR_GREY = 0x666666
    static COLOR_DARKGREY = 0x222222

    bar: NumberBar

    constructor () {
      super({ key: PreloaderScene.key })
    }

    createUiProgressBar (): NumberBar {
      const background = new RoundRectangle(this, 0, 0, 0, 0, 6, PreloaderScene.COLOR_DARKGREY)
      const track = new RoundRectangle(this, 0, 0, 0, 0, 4, PreloaderScene.COLOR_GREY)
      const indicator = new RoundRectangle(this, 0, 0, 0, 0, 4, PreloaderScene.COLOR_DARKGREY)

      this.add.existing(background)
      this.add.existing(track)
      this.add.existing(indicator)

      const bar = new NumberBar(this, {
        x: this.cameras.main.width / 2,
        y: this.cameras.main.height / 2,
        width: 100,

        background,
        slider: {
          track,
          indicator,

          space: {
            left: 4,
            right: 4,
            top: 2,
            bottom: 2,
            slider: 2,
          },
        }
      })
      bar.layout()
      this.add.existing(bar)
      bar.setValue(50)
      return bar
    }

    handleProgress = (value: number): void => {
      const percentage = value * 100
      this.bar.setValue(percentage, 0, 100)
      log('progress', value)
    }

    process (
      name: string,
      group: IAssetCollection,
      loaderFn: CallableFunction
    ): void {
      if (!group) return

      Object.keys(group)
        .forEach(key => {
          const definition = group[key]
          definition.key = definition.key || key
          loaderFn(definition)
          log(`queue ${name}:${key}`)
        })
    }

    prepare (): void {
      this.process(
        'animations',
        Animations,
        ({ frames, sheet, ...animation }: IAnimationSheetConfig) => this.anims.create({
          ...animation,
          frames: this.anims.generateFrameNumbers(sheet, { frames })
        })
      )
    }

    preload (): void {
      log('loading')

      this.bar = this.createUiProgressBar()
      this.load.on('progress', this.handleProgress)

      this.process(
        'sprites',
        SpriteSheets,
        (spritesheet: Phaser.Loader.FileTypes.SpriteSheetFile) => this.load.spritesheet(spritesheet),
      )
      this.process(
        'images',
        Images,
        (image: Phaser.Loader.FileTypes.ImageFile) => this.load.image(image),
      )
      this.process(
        'tiledtilemaps',
        TiledTileMaps,
        ({ key, url }: ITiledTileMapConfig) => this.load.tilemapTiledJSON(key, url)
      )
      this.process(
        'fonts',
        BitmapFonts,
        ({ key, png, fnt }: IBitmapFont) => this.load.bitmapFont(key, png, fnt)
      )
    }

    create (): void {
      this.prepare()
      log('Starting game')
      this.scene.start(MenuScene.key)
    }

    update (): void {
      this.bar.update()
    }
}
