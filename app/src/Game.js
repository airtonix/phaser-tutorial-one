import Phaser from 'phaser'

import {BootScene} from './Scenes/BootScene'
import {PreloaderScene} from './Scenes/PreloaderScene'
import {MenuScene} from './Scenes/MenuScene'
import {GameScene} from './Scenes/GameScene'


export class Game extends Phaser.Game {

    constructor() {

        // default renderer
        let renderer = Phaser.AUTO;

        // init game
        super({
            type: renderer,

            parent: "game_content",

            width: 800,
            height: 600,

            title: "Maintainable Game",

            scene: [
                BootScene,
                PreloaderScene,
                MenuScene,
                GameScene,
            ]
        });

    }
}