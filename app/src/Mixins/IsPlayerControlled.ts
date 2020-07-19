import { Constructor } from "~/Base";
import { Orientation } from '~/constants'
import { WritesLogs } from './WritesLogs';
import { CanMove } from './CanMove';
import { CanEmote } from './CanEmote';
import { CanInteract } from './CanInteract';
import { CanAnimate } from './CanAnimate';
import { ShouldDisplay } from "./ShouldDisplay";

export function IsPlayerControlled<TBase extends Constructor>(Base: TBase) {

    return class IsPlayerControlled extends CanInteract(CanAnimate(CanEmote(ShouldDisplay(CanMove(WritesLogs(Base)))))) {
        isMoving: boolean
        orientation: string
        isIdle: boolean

        constructor(...args: any[]) {
            super(...args)
            this.log('IsPlayerControlled')
        }

        update(time, delta, keys) {
            super.update(time, delta, keys)
            this.updateKeysPressed(time, delta, keys)
            this.animateMovement()
        }

        updateKeysPressed (...args: any[]) {
            const [time, delta, keys] = args
            this.beforeMove()

            // Horizontal movement
            if (keys.left.isDown && !keys.right.isDown) {
                this.orientation = Orientation.Left
                this.moveToLeft()
            }

            if (keys.right.isDown && !keys.left.isDown) {
                this.orientation = Orientation.Right
                this.moveToRight()
            }

            // Vertical movement
            if (keys.up.isDown && !keys.down.isDown) {
                this.orientation = Orientation.Up
                this.moveToUp()
            }

            if (keys.down.isDown && !keys.up.isDown) {
                this.orientation = Orientation.Down
                this.moveToDown()
            }

            if (keys.use.isDown) {
                this.use()
            }

            if (keys.jump.isDown) {
                this.jump()
            }

            this.afterMove()

        }
    }

}