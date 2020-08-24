import { OutlinePipeline } from '~/Shaders/OutlinePipeline'
import { WorldEntity } from '~/Objects/WorldEntity'
import { Orientation } from '~/Config/constants'
import { Logger } from '~/Core/Logger'

const log = Logger(module.id)

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

export class DisplayableEntity {
  sprite: Phaser.GameObjects.Sprite
  emote: Phaser.GameObjects.Sprite
  shadow: Phaser.GameObjects.Graphics

  constructor (
    public entity: WorldEntity,
    private scene: Phaser.Scene,
    public width: number,
    public height: number,
    public orientation: string = Orientation.Right,
    public animations: IAnimations
  ) {
    this.sprite = this.createSprite()
    this.shadow = this.createShadowSprite()

    entity.add([
      this.shadow,
      this.sprite,
    ])
    this.scene.add.existing(this.sprite)
  }

  /**
   * https://medium.com/@ionejunhong/sprite-outline-with-phaser-3-9c17190b04bc
   */
  outlineSprite (sprite: Phaser.GameObjects.Sprite): void {
    sprite.setPipeline(OutlinePipeline.KEY)
    sprite.pipeline.setFloat2(
      'uTextureSize',
      sprite.texture.getSourceImage().width,
      sprite.texture.getSourceImage().height
    )
  }

  createSprite (): Phaser.GameObjects.Sprite {
    const animation = this.getAnimation('idle', this.orientation)

    const {
      anim: {
        sheet = ''
      } = {}
    } = animation || {}

    const {
      anim: {
        frames: [
          frame
          ,
        ] = []
      } = {}
    } = animation || {}

    const sprite = new Phaser.GameObjects.Sprite(
      this.scene,
      0, 0,
      sheet,
      frame
    )

    sprite.setTexture(sheet)
    sprite.setFrame(frame)
    sprite.setSize(this.width, this.height)
    sprite.setOrigin(0.5, 1)

    return sprite
  }

  createShadowSprite (
    color = 0x000000,
  ): Phaser.GameObjects.Graphics {
    const shadow = new Phaser.GameObjects.Graphics(this.entity.scene)
    shadow.fillStyle(color, 0.4)
    shadow.fillEllipse(0, 0, this.width / 1.6, 4)
    return shadow
  }

  animate (animation: IAnimationConfig | undefined): void{
    if(!animation) return

    if(this.sprite.anims && this.sprite.anims.currentAnim?.key === animation.anim?.key) return
    log('animate', animation)

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
    variant = 'default'
  ): IAnimationConfig | undefined {
    if (!action) return
    try {
      const animations = this.animations

      const animationAction = animations[action]
        || animations.default

      const animation = animationAction[variant]
        || animationAction.default

      return animation
    } catch (err) {
      return
    }
  }

  animateAction (
    action: string
  ): void {
    const animation = this.getAnimation(action, this.orientation)
    this.animate(animation)
  }

}
