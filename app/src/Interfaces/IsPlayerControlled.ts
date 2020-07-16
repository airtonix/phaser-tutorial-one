import { Constructor } from "~/Base";
import { Orientation } from '~/constants'
import { WritesLogs } from './WritesLogs';
import { CanMove } from './CanMove';
import { CanInteract } from './CanInteract';
import { CanAnimate } from './CanAnimate';

export function IsPlayerControlled<TBase extends Constructor>(Base: TBase) {

    return class IsPlayerControlled extends CanInteract(CanMove(CanAnimate(WritesLogs(Base)))) {
        isMoving: boolean
        orientation: string
        beforeMove: Function
        afterMove: Function
        isIdle: boolean

        constructor(...args: any[]) {
            super(...args)
            this.log('IsPlayerControlled')
        }

        updateKeysPressed(time, delta, keys) {
            this.isMoving = keys.left.isDown
                || keys.right.isDown
                || keys.down.isDown
                || keys.up.isDown

            this.beforeMove()

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

            this.afterMove()

            if (!this.isMoving && !this.isIdle) {
                this.idle()
            }
        }
    }

}