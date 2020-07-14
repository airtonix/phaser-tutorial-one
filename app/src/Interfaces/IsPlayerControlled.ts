import { Mixin } from "ts-mixer";
import { Orientation } from '~/constants'
import { WritesLogs } from "./WritesLogs";
import { CanMove } from "./CanMove";
import { CanAnimate } from "./CanAnimate";
import { CanInteract } from "./CanInteract";

export class IsPlayerControlled extends Mixin(WritesLogs) {
    isMoving: boolean
    orientation: string

    constructor (...props) {
        super(...props)
        console.log('IsPlayerControlled')
    }

    updateKeysPressed (time, delta, keys) {

        this.isMoving = keys.left.isDown
            || keys.right.isDown
            || keys.down.isDown
            || keys.up.isDown

        this.preMotion()

        // Horizontal movement
        if (keys.left.isDown) {
            this.log('left')

            this.orientation = Orientation.Left
            this.moveToLeft()
        }
        else if (keys.right.isDown) {
            this.log('right')
            this.orientation = Orientation.Right
            this.moveToRight()
        }

        // Vertical movement
        if (keys.up.isDown) {
            this.log('up')
            this.orientation = Orientation.Up
            this.moveToUp()

        }
        else if (keys.down.isDown) {
            this.log('down')
            this.orientation = Orientation.Down
            this.moveToDown()
        }

        if (keys.use.isDown) {
            this.log('use')
            this.use()
        }

        if (keys.jump.isDown) {
            this.log('jump')

            this.jump()
        }

        this.postMotion()

        if (!this.isMoving && !this.isIdle) {
            this.idle()
        }
    }

}