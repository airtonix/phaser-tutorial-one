import { throttle } from 'lodash'
import { Mixin } from "ts-mixer"
import { WritesLogs } from "./WritesLogs"

export class CanMove extends Mixin(
    WritesLogs,
    Phaser.GameObjects.Container
) {
    scene: Phaser.Scene
    body: any
    props: object
    active: boolean
    prevVelocity = { x: 0, y: 0 }
    speed: integer = 45

    isIdle: boolean = false
    isMoving: boolean = false

    constructor (...props) {
        super(...props)
        console.log('CanMove')
        this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)
    }

    moveToLeft = () => {
        if (!this.active) return
        this.log('moveToLeft', -this.speed, this.prevVelocity)
        this.body.setVelocityX(-this.speed)
    }

    moveToRight = () => {
        if (!this.active) return

        // @ts-ignore
        this.log('moveToRight', this.speed, this.prevVelocity)
        this.body.setVelocityX(this.speed)
    }

    moveToDown = () => {
        if (!this.active) return

        // @ts-ignore
        this.log('moveToDown', this.speed, this.prevVelocity)
        this.body.setVelocityY(this.speed)
    }

    moveToUp = () => {
        if (!this.active) return

        // @ts-ignore
        this.log('moveToUp', this.speed, this.prevVelocity)
        this.body.setVelocityY(-this.speed)
    }

    jump = () => {}
    idle = () => {}

    preMotion() {
        if (!this.active) return

        // @ts-ignore
        this.prevVelocity = this.body.velocity.clone()
        // Stop any previous movement from the last frame
        // @ts-ignore
        this.body.setVelocity(0)
    }

    postMotion() {
        if (!this.active) return
        const { x, y } = this.prevVelocity
        this.isIdle = (y === 0 && x === 0)

        if (this.isIdle) return

        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        // @ts-ignore
        this.body.velocity.normalize().scale(this.speed)
    }

    updateMovements = throttle((time, delta) => {
        this.log(time)
    }, 1000)

}