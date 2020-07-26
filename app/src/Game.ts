import Phaser from 'phaser'
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'

import { PreloaderScene } from '~/Scenes/PreloaderScene'
import { MenuScene } from '~/Scenes/MenuScene'
import { InterfaceScene } from '~/Scenes/InterfaceScene'
import { LevelOneScene } from '~/Scenes/LevelOneScene'
import { GameScene } from '~Scenes/GameScene'

export class Game extends Phaser.Game {
    constructor() {
        super({
            title: 'Maintainable Game',

            type: Phaser.AUTO,
            backgroundColor: '#000',

            parent: 'game_content',

            width: window.innerWidth / 2,
            height: window.innerHeight / 2,

            render: {
                // prevent tile bleeding
                antialiasGL: false,
                // prevent pixel art from becoming blurry when scaled
                pixelArt: true,
            },

            zoom: 2,

            plugins: {
                global: [
                    NineSlicePlugin.DefaultCfg
                ],
            },

            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    gravity: { y: 0 }
                }
            },

            scene: [
                PreloaderScene,
                MenuScene,
                GameScene,
                InterfaceScene,
                LevelOneScene,
            ]
        })
    }
}
