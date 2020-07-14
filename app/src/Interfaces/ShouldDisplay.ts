import { SpriteSheets } from '~/constants'

export class ShouldDisplay {
    emotes: any
    sprite: Phaser.GameObjects.Sprite

    constructor (...props) {
        console.log('ShouldDisplay')
    }

    /**
     * https://medium.com/@ionejunhong/sprite-outline-with-phaser-3-9c17190b04bc
     */
    outlineSprite (sprite) {
        sprite.setPipeline(OutlinePipeline.KEY)
        sprite.pipeline.setFloat2(
            'uTextureSize',
            sprite.texture.getSourceImage().width,
            sprite.texture.getSourceImage().height
        )
    }

    createSprite () {
        const animation = this.animations.idle[this.orientation] || idle.default
        const { sheet } = animation.anim
        const frame = animation.anim.frames[0]

        const sprite = this.scene.make.sprite(0, 0, sheet, frame)//new Phaser.GameObjects.Sprite(this.scene, 0, 0, key, frame)
        sprite.setTexture(sheet)
        sprite.setFrame(frame)
        sprite.setSize(width, height)
        sprite.setOrigin(0.5, 0.9)

        return sprite
    }

    createShadowSprite(
        scene: Phaser.Scene,
        color = 0x000000,
        width: integer
    ) {
        const shadow = new Phaser.GameObjects.Graphics(scene)
        const ellipse = new Phaser.Geom.Ellipse(0, 3, width / 1.5, 4)
        shadow.fillStyle(color, 0.4)
        shadow.fillEllipseShape(ellipse)
        return shadow
    }

    createEmoteSprite (scene: Phaser.Scene) {
        const emotes = this.emotes

        const sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, sheet)
        sprite.setTexture(sheet)
        sprite.setSize(width, height)
        sprite.setOrigin(0.5, 2)
        sprite.setVisible(false)
        return sprite
    }

    showEmoteFrame (frame) {
        this.emote.setFrame(frame)
        this.emote.setVisible(true)
    }
}