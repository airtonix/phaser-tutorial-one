import Phaser from 'phaser'
import Health from 'phaser-component-health'


export class Thing extends Phaser.GameObjects.Container {

    static SPRITE_SHEET_NAME = null

    static SPRITE_WIDTH = null
    static SPRITE_HEIGHT = null
    static SPRITE_FOOTPRINT_WIDTH = null
    static SPRITE_FOOTPRINT_HEIGHT = null

    static IDLE_ANIMATION_NAME = null
    static IDLE_ANIMATION_FRAME_START = null
    static IDLE_ANIMATION_FRAME_END = null
    static IDLE_ANIMATION_FRAME_RATE = null
    static IDLE_ANIMATION_FRAME_REPEAT = null

    constructor(props) {
        const {
            name = 'Unknown',
            x = 0,
            y = 0,
            scene,
            health = 100,
            maxHealth = 100,
            speed = 0
        } = props
        super(scene, x, y)
        this.props = props
        this.class = this.constructor.name

        if (!scene) throw Error(`${this.class}[${name}] requires a scene`)

        this.scene = scene
        this.name = name
        this.x = x
        this.y = y
        this.speed = speed

        this.setX(x)
        this.setY(y)

        this.setSize(
            this.constructor.SPRITE_FOOTPRINT_WIDTH,
            this.constructor.SPRITE_FOOTPRINT_HEIGHT)

        this.sprite = this.createSprite()

        this.health = Health.AddTo(
            this,
            health,
            maxHealth)

        this.on('die', this.handleDeath)
        this.on('revive', this.handleRevived)
        this.on('healthchange', this.handleHealthChanged)
        this.on('heal', this.handleRecieveHealing)
        this.on('damage', this.handleRecieveDamage)

        this.add([
            this.sprite,
        ])
        scene.add.existing(this.sprite)
        scene.add.existing(this)

        scene.physics.world.enable(this)

    }

    createSprite () {
        const anims = this.scene.anims

        anims.create({
            key: this.constructor.IDLE_ANIMATION_NAME,
            frames: anims.generateFrameNumbers(
                this.constructor.SPRITE_SHEET_NAME,
                {
                    start: this.constructor.IDLE_ANIMATION_START,
                    end: this.constructor.IDLE_ANIMATION_END
                }),
            frameRate: this.constructor.IDLE_ANIMATION_RATE,
            repeat: this.constructor.IDLE_ANIMATION_REPEAT
        })

        const sprite = this.scene.add
            .sprite(
                0,
                - (this.constructor.SPRITE_FOOTPRINT_HEIGHT),
                this.constructor.SPRITE_SHEET_NAME,
                0)
            .setSize(
                this.constructor.SPRITE_WIDTH,
                this.constructor.SPRITE_HEIGHT)

        return sprite
    }

    handleDeath () {
        console.log(`${this.class}[${this.name}] DEATH`)
        this.sprite
            .setActive(false)
            .setVisible(false)

        // TODO: set death animation
    }

    handleRevived () {
        console.log(`${this.class}[${this.name}] REVIVED`)
        this.sprite
            .setActive(true)
            .setVisible(true)
    }

    handleHealthChanged (obj, amount, health, maxHealth) {
        console.log(`[${this.name}] HEALTHCHANGE: ${amount} > now ${health}/${maxHealth}`)
    }

    handleRecieveHealing () {
        console.log(`${this.class}[${this.name}] WASHEALED`)
    }

    handleRecieveDamage () {
        console.log(`${this.class}[${this.name}] WASDAMAGED`)
    }

}
