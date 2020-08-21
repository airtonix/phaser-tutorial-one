import { Orientation } from '~/Config/constants'

export interface IAnimationSheetConfig {
    key: string,
    frameRate?: integer,
    repeat: integer,
    padding?: integer,
    frames: integer[],
    sheet: string,
}

export interface IAnimationConfig {
    flip?: boolean,
    anim: IAnimationSheetConfig
}

export interface IAnimationGroup {
    default: IAnimationConfig
    [animationVariant: string]: IAnimationConfig
}

export interface IAnimations {
  default: IAnimationGroup
  [animationGroup: string]: IAnimationGroup
}

export class CanAnimate extends Phaser.GameObjects.Container {
  body: Phaser.Physics.Arcade.Body
  scene: Phaser.Scene
  sprite: Phaser.GameObjects.Sprite
  active = true
  animations: IAnimations
  orientation: Orientation
  isIdle: boolean

  constructor (
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y)
    if (!this.body) {
      this.scene.physics.add.existing(this)
      this.scene.physics.world.enable(this)
    }
  }

  update (): void {
    this.animateMovement()
  }

  animate (animation: IAnimationConfig | undefined): void{
    if(!animation) return
    if(this.sprite.anims.currentAnim?.key === animation.anim?.key) return

    const { flip, anim } = animation

    if (typeof flip !== 'undefined') {
      this.sprite.setFlip(flip, false)
    }

    if (anim) {
      const { key } = anim
      this.sprite.play(key, true, 0)
    }
  }

  getAnimation (
    action: string | false,
    variant: string
  ): IAnimationConfig | undefined {
    if (!action) return
    if (!this.animations) return

    const animationAction = this.animations[action]
      || this.animations.default

    const animation = animationAction[variant]
      || animationAction.default

    return animation
  }

  animateMovement = (): void => {
    const action =
      !this.isIdle && 'moving' ||
      this.isIdle && 'idle'

    const animation = this.getAnimation(action, this.orientation)
    this.animate(animation)
  }
}
