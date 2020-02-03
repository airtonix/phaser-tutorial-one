/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
import Phaser from "phaser"
import Health from "phaser-component-health"
import HealthBar from "./HealthBar"


export default class Actor extends Phaser.GameObjects.Container {

    static SPRITE_SHEET_NAME = "actors"

    static WALK_FORWARD_NAME = "actor-walk-forward"
    static WALK_FORWARD_FRAME_START = 46
    static WALK_FORWARD_FRAME_END = 49
    static WALK_FORWARD_FRAME_RATE = 8
    static WALK_FORWARD_FRAME_REPEAT = -1

    static WALK_BACKWARD_NAME = "actor-walk-backward"
    static WALK_BACKWARD_FRAME_START = 65
    static WALK_BACKWARD_FRAME_END = 68
    static WALK_BACKWARD_FRAME_RATE = 8
    static WALK_BACKWARD_FRAME_REPEAT = -1
    static IDLE_FRAME = 65
    static NON_IDLE_FRAME = 46

    constructor({
        name = "actor",
        x = 0,
        y = 0,
        scene,
        health = 100,
        maxHealth = 100,
        speed = 300
    }) {
        super(scene, x, y)

        if (!scene) throw Error(`Actor[${name}] requires a scene`)

        this.scene = scene
        this.name = name
        this.x = x
        this.y = y
        this.speed = speed
        this.setX(x)
        this.setY(y)
        this.setSize(22, 22)

        this.sprite = this.createSprite()

        this.health = Health.AddTo(
            this,
            health,
            maxHealth)

        this.healthbar = new HealthBar(this.scene, this)

        this.on("die", this.handleCharacterDeath)
        this.on("damage", this.handleCharacterDamage)
        this.on("heal", this.handleCharacterHeal)
        this.on("revive", this.handleCharacterRevive)
        this.on("healthchange", this.handleCharacterHealthChange)

        this.add([
            this.sprite,
            this.healthbar
        ])
        scene.add.existing(this.sprite)
        scene.add.existing(this.healthbar)
        scene.add.existing(this)

        scene.physics.world.enable(this)

    }

    createSprite () {
        if (!this.scene) return

        const anims = this.scene.anims
        anims.create({
            key: this.constructor.WALK_FORWARD_NAME,
            frames: anims.generateFrameNumbers(
                this.constructor.SPRITE_SHEET_NAME,
                {
                    start: this.constructor.WALK_FORWARD_FRAME_START,
                    end: this.constructor.WALK_FORWARD_FRAME_END
                }),
            frameRate: this.constructor.WALK_FORWARD_FRAME_RATE,
            repeat: this.constructor.WALK_FORWARD_FRAME_REPEAT
        })

        anims.create({
            key: this.constructor.WALK_BACKWARD_NAME,
            frames: anims.generateFrameNumbers(
                this.constructor.SPRITE_SHEET_NAME,
                {
                    start: this.constructor.WALK_BACKWARD_FRAME_START,
                    end: this.constructor.WALK_BACKWARD_FRAME_END
                }),
            frameRate: this.constructor.WALK_BACKWARD_FRAME_RATE,
            repeat: this.constructor.WALK_BACKWARD_FRAME_REPEAT
        })

        const sprite = this.scene.add
            .sprite(
                0,
                -22,
                this.constructor.SPRITE_SHEET_NAME,
                0)
            .setSize(22, 33)

        return sprite
    }

    handleCharacterDeath () {
        console.log(`[${this.name}] DEATH`)
        this.sprite
            .setActive(false)
            .setVisible(false)

        this.healthbar.set(0)
    }

    handleCharacterRevive () {
        console.log(`[${this.name}] REVIVE`)
        this.sprite
            .setActive(true)
            .setVisible(true)

        this.healthbar.set(this.health.max)

    }

    handleCharacterHealthChange (obj, amount, health, maxHealth) {
        console.log(`[${this.name}] HEALTHCHANGE: ${amount} > now ${health}/${maxHealth}`)
        this.healthbar.set(amount)
    }

    handleCharacterHeal () {
    }

    handleCharacterDamage () {
    }

    moveLeft = () => {
        this.preMove()

        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityX(-this.speed)
        this.sprite.setFlipX(true)
        this.sprite.anims.play(animation_name, true)

    }

    moveRight = () => {
        this.preMove()

        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityX(this.speed)
        this.sprite.setFlipX(false)
        this.sprite.anims.play(animation_name, true)

    }

    moveDown = () => {
        this.preMove()

        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityY(this.speed)
        this.sprite.anims.play(animation_name, true)

    }

    moveUp = () => {
        this.preMove()

        const animation_name = this.constructor.WALK_BACKWARD_NAME

        this.body.setVelocityY(-this.speed)
        this.sprite.anims.play(animation_name, true)

    }

    stop = () => {
        this.sprite.anims.stop()
        this.sprite.setTexture(
            this.constructor.SPRITE_SHEET_NAME,
            this.constructor.NON_IDLE_FRAME)
    }

    idle = () => {
        this.sprite.anims.stop()
        this.sprite.setTexture(
            this.constructor.SPRITE_SHEET_NAME,
            this.constructor.IDLE_FRAME)
    }

    freeze() {
        this.body.moves = false
    }

    preMove () {
        const prevVelocity = this.body.velocity.clone()
        // Stop any previous movement from the last frame
        this.body.setVelocity(0)
        return prevVelocity
    }

    postMove () {
        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        this.body.velocity.normalize().scale(this.speed)
    }

    destroy() {
        this.sprite.destroy()
    }

    update () {
    }

}
