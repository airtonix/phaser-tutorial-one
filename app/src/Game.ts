import Phaser from 'phaser'

import { Logger } from '~/core/Logger'
import { BootScene } from '~/Scenes/boot/BootScene'
import { GameScene } from '~/Scenes/game/GameScene'
import { MenuScene } from '~/Scenes/menu/MenuScene'

const log = Logger(module.id)

export class Game extends Phaser.Game {

    constructor() {
        log('construct')
        // default renderer
        const renderer = Phaser.AUTO;

        // init game
        super({
            type: renderer,

            parent: 'game_content',

            width: window.innerWidth,
            height: window.innerHeight,

            title: 'The Game',

            scene: [
                BootScene,
                MenuScene,
                GameScene,
            ],
        });

    }
}
