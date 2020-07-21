import { AbstractBaseScene } from '~/core/BaseScene'
import { EVENTS } from '~/core/events';
import { Player } from '~/Objects/Player'
import { GameManagerScene } from '~/Scenes/game/GameScene'
// import { ASSETS } from '../constants/assets';
// import { SCENES } from '../constants/scenes';

const DISTANCE_BETWEEN_HEARTS = 15;

export class GameInterfaceScene extends AbstractBaseScene {
    public static key = 'GameInterface'
    private hearts: Phaser.GameObjects.Sprite[];
    private gameManager: GameManagerScene;

    constructor() {
        super({ key: GameInterfaceScene.key })
        this.hearts = [];
    }

    protected create(): void {
        const gameManager: GameManagerScene = this.scene.get(GameManagerScene.key);
        this.gameManager = gameManager;

        this.gameManager.events.on(EVENTS.UPDATE_HP, () => {
            this.updateHearts();
        });

        this.initHearts();
    }

    private initHearts() {
        Array(Player.MAX_HP)
            .fill(0)
            .map((_, i) => {
                return this.add
                    .sprite(
                        (i + 1) * DISTANCE_BETWEEN_HEARTS,
                        DISTANCE_BETWEEN_HEARTS,
                        ASSETS.IMAGES.HEART_EMPTY,
                    )
                    .setScrollFactor(0)
                    .setDepth(50);
            });

        this.hearts = Array(this.gameManager.playerHp)
            .fill(0)
            .map((_, i) => {
                return this.add
                    .sprite((i + 1) * DISTANCE_BETWEEN_HEARTS, DISTANCE_BETWEEN_HEARTS, ASSETS.IMAGES.HEART)
                    .setScrollFactor(0)
                    .setDepth(100);
            });
    }

    private updateHearts() {
        this.hearts.map((heart, index) => {
            if (index >= this.gameManager.playerHp) {
                heart.setAlpha(0);
            }
        });
    }
}
