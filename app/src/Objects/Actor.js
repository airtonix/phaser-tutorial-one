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
    static SPRITE_FRAME_HEIGHT = 64
    static SPRITE_FRAME_WIDTH = 64

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
        w = Actor.SPRITE_FRAME_WIDTH,
        h = Actor.SPRITE_FRAME_HEIGHT,
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
        this.w = w
        this.h = h
        this.speed = speed
        this.setX(x)
        this.setY(y)
        this.setSize(w, h)

        this.character = this.createCharacter()

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
            this.character,
            this.healthbar
        ])
        scene.add.existing(this.character)
        scene.add.existing(this.healthbar)
        scene.add.existing(this)

        scene.physics.world.enable(this)

    }

    createCharacter () {
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
                this.h - (this.constructor.SPRITE_FRAME_HEIGHT - this.h),
                this.constructor.SPRITE_SHEET_NAME,
                0)
            .setSize(
                this.constructor.SPRITE_FRAME_WIDTH,
                this.constructor.SPRITE_FRAME_HEIGHT)

        return sprite
    }

    createCharacterShadow () {
        return Phaser.Circle()
    }

    handleCharacterDeath () {
        console.log(`[${this.name}] DEATH`)
        this.character
            .setActive(false)
            .setVisible(false)

        this.healthbar.set(0)
    }

    handleCharacterRevive () {
        console.log(`[${this.name}] REVIVE`)
        this.character
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

    moveWest = () => {
        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityX(-this.speed)
        this.character.setFlipX(true)
        this.character.anims.play(animation_name, true)

    }

    moveEast = () => {
        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityX(this.speed)
        this.character.setFlipX(false)
        this.character.anims.play(animation_name, true)

    }

    moveSouth = () => {
        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityY(this.speed)
        this.character.anims.play(animation_name, true)

    }

    moveSouthEast = () => {
        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityY(this.speed)
        this.body.setVelocityX(this.speed)
        this.character.setFlipX(false)
        this.character.anims.play(animation_name, true)

    }

    moveSouthWest = () => {
        const animation_name = this.constructor.WALK_FORWARD_NAME

        this.body.setVelocityY(this.speed)
        this.body.setVelocityX(-this.speed)
        this.character.setFlipX(true)
        this.character.anims.play(animation_name, true)
    }

    moveNorth = () => {
        const animation_name = this.constructor.WALK_BACKWARD_NAME
        this.body.setVelocityY(-this.speed)
        this.character.anims.play(animation_name, true)
    }

    moveNorthEast = () => {
        const animation_name = this.constructor.WALK_BACKWARD_NAME
        this.body.setVelocityY(-this.speed)
        this.body.setVelocityX(this.speed)
        this.character.setFlipX(false)
        this.character.anims.play(animation_name, true)
    }

    moveNorthWest = () => {
        const animation_name = this.constructor.WALK_BACKWARD_NAME
        this.body.setVelocityY(-this.speed)
        this.body.setVelocityX(-this.speed)
        this.character.setFlipX(true)
        this.character.anims.play(animation_name, true)
    }

    stop = () => {
        this.character.anims.stop()
        this.character.setTexture(
            this.constructor.SPRITE_SHEET_NAME,
            this.constructor.NON_IDLE_FRAME)
    }

    idle = () => {
        this.character.anims.stop()
        this.character.setTexture(
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
        this.character.destroy()
    }

    update () {
    }

}
