import { BaseScene } from './BaseScene'
import { GameScene } from './GameScene'

import {
    SpriteSheets,
    Images,
    TiledTileMaps,
    Animations,
    BitmapFonts,
} from '~/Config/constants'

interface IProgressUiConfig {
    width: number
    height: number
    centerX: number
    centerY: number
    boxWidth: number
    boxHeight: number
    boxPadding: number
}

export class PreloaderScene extends BaseScene {
    static key = 'PreloaderScene'

    WHITE = 0xffffff
    GREY = 0x666666
    DARKGREY = 0x222222

    private box: Phaser.GameObjects.Graphics
    private bar: Phaser.GameObjects.Graphics
    private config: IProgressUiConfig
    private percent: Phaser.GameObjects.Text
    private header: Phaser.GameObjects.Text
    private asset: Phaser.GameObjects.Text
    private assetPercent: Phaser.GameObjects.Text

    constructor () {
        super({ key: PreloaderScene.key })
    }

    public handleProgress = (value: number): void => {
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

    public handleFileProgress = (file: Phaser.Loader.File, value: number): void => {
        const percentage = value * 100
        this.log('fileProgress', file.key, percentage)
        this.asset.setText(`> ${file.key}`)
        this.assetPercent.setText(`${percentage}%`)
    }

    public handleComplete = (): void => {
        this.bar.destroy()
        this.box.destroy()
        this.header.destroy()
        this.percent.destroy()
        this.asset.destroy()
        this.assetPercent.destroy()
    }

    public generateLayoutConfig = (): IProgressUiConfig => {
        const config = {
            centerX: 0,
            centerY: 0,
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            boxWidth: 320,
            boxHeight: 50,
            boxPadding: 16,
        }
        config.centerX = (config.width / 2)
        config.centerY = (config.height / 2)
        return config
    }

    public render (): void {
        this.box = this.add.graphics()
        this.box.fillStyle(this.WHITE, 0.2)
        this.box.fillRect(
            this.config.centerX - (this.config.boxWidth / 2) ,
            this.config.centerY - (this.config.boxHeight / 2),
            this.config.boxWidth, this.config.boxHeight)

        this.bar = this.add.graphics()
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

    preload () {
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

    process (name, group, loaderFn) {
        if (!group) return
        Object.keys(group)
            .forEach(key => {
                this.log(`queue ${name}:${key}`)
                const definition = group[key]
                definition.key = definition.key || key
                loaderFn(definition)
            })
    }

    prepare () {
        require('~/Items')
        this.process(
            'animations',
            Animations,
            ({ frames, sheet, ...animation }) => this.anims.create({
                ...animation,
                frames: this.anims.generateFrameNumbers(sheet, { frames })
            })
        )
    }

    create () {
        this.prepare()
        this.log('Starting game')
        this.scene.start(GameScene.key)
    }
}
