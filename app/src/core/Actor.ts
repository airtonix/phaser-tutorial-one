import { AbstractBaseScene } from '~/core/BaseScene';
import { Orientation } from '~/core/Orientation';
// import { Scenes } from '~/Scenes';
// import { GameManager } from '../scenes/GameManager';

type CharacterAnimation = {
  [K in Orientation]: {
    flip: boolean;
    anim: string;
  };
};

export abstract class AbstractActor extends Phaser.Physics.Arcade.Sprite {
  public static EVENT_KEYS = {
    UPDATE_HP: 'updateHp',
  }
  protected scene: AbstractBaseScene;
//   protected uiScene: GameManager;

  constructor(scene: AbstractBaseScene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite, 0);
    this.scene = scene;
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);

    // const uiScene: any = this.scene.scene.get(SCENES.GAME_MANAGER);
    // this.uiScene = uiScene;
  }

  protected animate(animationKeys: CharacterAnimation, orientation: Orientation): void {
    const { flip, anim } = animationKeys[orientation];
    this.setFlipX(flip);
    this.play(anim, true);
  }
}
