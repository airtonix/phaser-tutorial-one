import { get } from 'lodash'

import { WritesLogs } from './WritesLogs'

import { Constructor } from '~/Core/framework'
import { OutlinePipeline } from '~/Shaders/OutlinePipeline'

export function ShouldDisplay<TBase extends Constructor> (Base: TBase) {
    return class ShouldDisplay extends WritesLogs(Base) {
        scene: Phaser.Scene
        sprite: Phaser.GameObjects.Sprite
        emote: Phaser.GameObjects.Sprite
        shadow: Phaser.GameObjects.Graphics
        emotes: object
        animations: object
        orientation: string
        width: integer
        height: integer

        constructor (...args: any[]) {
            super(...args)
            this.scene = args[0]
            this.log('ShouldDisplay')
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
        outlineSprite (sprite: Phaser.GameObjects.Sprite) {
            sprite.setPipeline(OutlinePipeline.KEY)
            sprite.pipeline.setFloat2(
                'uTextureSize',
                sprite.texture.getSourceImage().width,
                sprite.texture.getSourceImage().height
            )
        }

        createSprite () {
            const animation = get(
                this.animations,
                `idle.${this.orientation}`,
                get(this.animations, 'idle.default', {})
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
}