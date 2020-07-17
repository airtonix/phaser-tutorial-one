import { get } from 'lodash'
import { Constructor } from '~/Base'
import { OutlinePipeline } from '~/Shaders/OutlinePipeline'
import { WritesLogs } from './WritesLogs'

export function ShouldDisplay<TBase extends Constructor>(Base: TBase) {
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

        constructor(...args: any[]) {
            super(...args)
            this.scene = args[0]
            this.log('ShouldDisplay')
            this.sprite = this.createSprite()
            this.shadow = this.createShadowSprite()
            this.emote = this.createEmoteSprite()

            this.add(this.sprite)
            this.add(this.shadow)
            this.add(this.emote)

            this.scene.add.existing(this)
            this.scene.physics.add.existing(this)
            this.scene.physics.world.enable(this)
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
                get(this.animations, `idle.default`, {})
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
            sprite.setOrigin(0.5, 0.9)

            return sprite
        }

        createShadowSprite(
            color = 0x000000,
        ): Phaser.GameObjects.Graphics {
            const shadow = new Phaser.GameObjects.Graphics(this.scene)
            const ellipse = new Phaser.Geom.Ellipse(0, 3, this.width / 1.5, 4)
            shadow.fillStyle(color, 0.4)
            shadow.fillEllipseShape(ellipse)
            return shadow
        }

        createEmoteSprite (): Phaser.GameObjects.Sprite {
            const sheet = get(this.emotes, "sheet")
            const sprite = this.scene.make.sprite(0, 0, sheet)
            sprite.setTexture(sheet)
            sprite.setSize(this.width, this.height)
            sprite.setOrigin(0.5, 2)
            sprite.setVisible(false)
            return sprite
        }

        showEmoteFrame (frame: integer): void {
            this.emote.setFrame(frame)
            this.emote.setVisible(true)
        }
    }
}