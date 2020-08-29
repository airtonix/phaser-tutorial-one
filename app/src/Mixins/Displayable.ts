import { OutlinePipeline } from '~/Shaders/OutlinePipeline'
import { WorldEntity } from '~/Objects/WorldEntity'
import { Orientation, IAnimationSheetConfig } from '~/Config/constants'
import { Logger, Logs } from '~/Core/Logger'

const log = Logger(module.id)

export interface ICharacterAnimationConfig {
  flip?: boolean,
  anim: IAnimationSheetConfig
}

export interface ICharacterActionAnimationMap {
  default: ICharacterAnimationConfig
  [actionVariant: string]: ICharacterAnimationConfig
}

export interface ICharacterAnimationMap {
  default: ICharacterActionAnimationMap
  [action: string]: ICharacterActionAnimationMap
}

@Logs
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
    public animations: ICharacterAnimationMap
  ) {
    this.sprite = this.createSprite()
    this.shadow = this.createShadowSprite()

    entity.add([
      this.shadow,
      this.sprite,
    ])

    this.scene.add.existing(this.sprite)

    if (this.entity.hasOwnProperty('action')) {
      this.scene.events.on('update', () => {
        this.animateAction(this.entity.action)
      })
    }
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
    const shadow = new Phaser.GameObjects.Graphics(this.scene)
    shadow.fillStyle(color, 0.4)
    shadow.fillEllipse(0, 0, this.width / 1.6, 4)
    return shadow
  }

  animate (animation: ICharacterAnimationConfig | undefined): void{
    if (!animation) return
    if (!this.sprite || !this.sprite.anims) return

    if(this.sprite.anims.currentAnim?.key === animation.anim?.key) return

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
  ): ICharacterAnimationConfig | undefined {
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
    // const orientations = this.entity?.movement?.isMovingTo || []
    // this.log(orientations.join(''))
    const animation = this.getAnimation(action, this.orientation)
    this.animate(animation)
  }

}
