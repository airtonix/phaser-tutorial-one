import { classes } from 'polytype'

import {
  SpriteSheets,
  Images,
  TiledTileMaps,
  Animations,
  BitmapFonts,
} from '~/Config/constants'

import { BaseScene } from './BaseScene'
import { MenuScene } from './MenuScene'

interface IProgressUiConfig {
    width: number
    height: number
    centerX: number
    centerY: number
    boxWidth: number
    boxHeight: number
    boxPadding: number
}

interface IAssetCollection {
    [key: string]: any
}

export class PreloaderScene extends BaseScene {
    static key = 'PreloaderScene'

    WHITE = 0xffffff
    GREY = 0x666666
    DARKGREY = 0x222222

    box: Phaser.GameObjects.Graphics
    bar: Phaser.GameObjects.Graphics
    config: IProgressUiConfig
    percent: Phaser.GameObjects.Text
    header: Phaser.GameObjects.Text
    asset: Phaser.GameObjects.Text
    assetPercent: Phaser.GameObjects.Text

    constructor () {
      super({ key: PreloaderScene.key })
      this.log('constructed')
    }

    handleProgress = (value: number): void => {
      this.bar.clear()
      this.bar.fillStyle(this.WHITE, 0.4)
      this.bar.fillRect(
        this.config.centerX - ((this.config.boxWidth - this.config.boxPadding) / 2),
        this.config.centerY - ((this.config.boxHeight - this.config.boxPadding) / 2),
        (this.config.boxWidth - (this.config.boxPadding)) * value,
        this.config.boxHeight - (this.config.boxPadding)
      )
      const percentage = value * 100
      this.percent.setText(`${percentage}%`)
      this.log('progress', value)
    }

    handleFileProgress = (file: Phaser.Loader.File, value: number): void => {
      const percentage = value * 100
      this.log('fileProgress', file.key, percentage)
      this.asset.setText(`> ${file.key}`)
      this.assetPercent.setText(`${percentage}%`)
    }

    handleComplete = (): void => {
      this.bar.destroy()
      this.box.destroy()
      this.header.destroy()
      this.percent.destroy()
      this.asset.destroy()
      this.assetPercent.destroy()
    }

    generateLayoutConfig = (): IProgressUiConfig => {
      const config = {
        centerX: 0,
        centerY: 0,
        width: this.sys.cameras.main.width,
        height: this.sys.cameras.main.height,
        boxWidth: 320,
        boxHeight: 50,
        boxPadding: 16,
      }
      config.centerX = (config.width / 2)
      config.centerY = (config.height / 2)
      return config
    }

    render (): void {
      this.box = this.sys.add.graphics()
      this.box.fillStyle(this.WHITE, 0.2)
      this.box.fillRect(
        this.config.centerX - (this.config.boxWidth / 2) ,
        this.config.centerY - (this.config.boxHeight / 2),
        this.config.boxWidth, this.config.boxHeight)

      this.bar = this.sys.add.graphics()
      this.header = this.make.text({
        x: this.config.centerX,
        y: this.config.centerY - this.config.boxHeight,
        text: 'Loading...',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
      })
      this.header.setOrigin(0.5, 0.5)
      this.percent = this.make.text({
        x: this.config.centerX,
        y: this.config.centerY,
        text: '0%',
        style: {
          font: '18px monospace',
          fill: '#ffffff'
        },
      })
      this.percent.setOrigin(0.5, 0.5)
      this.asset = this.make.text({
        x: this.config.centerX - this.config.boxWidth / 2,
        y: this.config.centerY + this.config.boxHeight,
        text: '',
        style: {
          font: '18px monospace',
          fill: '#ffffff'
        },
      })
      this.asset.setOrigin(0, 0.5)
      this.assetPercent = this.make.text({
        x: this.config.centerX + this.config.boxWidth / 2,
        y: this.config.centerY + this.config.boxHeight,
        text: '',
        style: {
          font: '18px monospace',
          fill: '#ffffff'
        },
      })
      this.assetPercent.setOrigin(1, 0.5)

      this.load.on('fileprogress', this.handleFileProgress)
      this.load.on('progress', this.handleProgress)
      this.load.on('complete', this.handleComplete)
    }

    preload (): void {
      this.log('loading')
      this.config = this.generateLayoutConfig()
      this.render()

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
        ({ key, url }) => this.load.tilemapTiledJSON(key, url)
      )
      this.process(
        'fonts',
        BitmapFonts,
        ({ key, png, fnt }) => this.load.bitmapFont(key, png, fnt)
      )
    }

    process (
      name: string,
      group: IAssetCollection,
      loaderFn: CallableFunction
    ): void {
      if (!group) return
      Object.keys(group)
        .forEach(key => {
          this.log(`queue ${name}:${key}`)
          const definition = group[key]
          definition.key = definition.key || key
          loaderFn(definition)
        })
    }

    prepare (): void {
      this.process(
        'animations',
        Animations,
        ({ frames, sheet, ...animation }) => this.anims.create({
          ...animation,
          frames: this.anims.generateFrameNumbers(sheet, { frames })
        })
      )
    }

    create (): void {
      this.prepare()
      this.log('Starting game')
      this.scene.start(MenuScene.key)
    }
}
