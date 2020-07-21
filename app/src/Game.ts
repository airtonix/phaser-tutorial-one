import Phaser from 'phaser'
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'

import { PreloaderScene } from './Scenes/PreloaderScene'
import { MenuScene } from './Scenes/MenuScene'
import { InterfaceScene } from './Scenes/InterfaceScene'
import { LevelOneScene } from './Scenes/LevelOneScene'

export class Game extends Phaser.Game {

    constructor() {
        // init game
        super({
            title: 'Maintainable Game',

            type: Phaser.AUTO,
            backgroundColor: '#000',

            parent: 'game_content',

            width: window.innerWidth,
            height: window.innerHeight,

            render: {
                // prevent tile bleeding
                antialiasGL: false,
                // prevent pixel art from becoming blurry when scaled
                pixelArt: true
            },

            plugins: {
                global: [ NineSlicePlugin.DefaultCfg ],
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
                LevelOneScene,
                InterfaceScene,
            ]
        })
    }
}
