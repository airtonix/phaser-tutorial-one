import { OutlinePipeline } from '~/Shaders/OutlinePipeline'

import { IEmoteGroup } from './CanEmote'
import { IAnimations } from './CanAnimate'

export class ShouldDisplay extends Phaser.GameObjects.Container {

  sprite: Phaser.GameObjects.Sprite
  emote: Phaser.GameObjects.Sprite
  shadow: Phaser.GameObjects.Graphics
  emotes: IEmoteGroup
  animations: IAnimations
  orientation: string
  footprintWidth: integer
  footprintHeight: integer

  constructor (
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y)
    this.sprite = this.createSprite()
    this.shadow = this.createShadowSprite()

    this.add([
      this.shadow,
      this.sprite,
    ])
    this.setSize(
      this.footprintWidth,
      this.footprintHeight
    )
    this.scene.add.existing(this)
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
    const animation = this.getAnimation(
      'idle',
      this.orientation
    )

    const { sheet } = animation.anim
    const frame = animation.anim.frames[0]

    const sprite = this.scene.make.sprite({
      x: 0,
      y: 0,
      key: sheet,
      frame
    })

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
}
