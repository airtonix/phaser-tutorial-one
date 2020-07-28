import { debounce } from 'lodash'
import { Orientation } from '~/constants'
import { Constructor } from "~/Core/framework";
import { WritesLogs } from './WritesLogs';

export const EVENT_KEY_OPEN_PLAYER_INVENTORY = 'open-player-inventory'

export function IsPlayerControlled<TBase extends Constructor>(Base: TBase) {

    return class IsPlayerControlled extends WritesLogs(Base) {
        isMoving: boolean
        orientation: string
        isIdle: boolean
        animateMovement: () => void

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
            }else if (keys.right.isDown && !keys.left.isDown) {
                this.orientation = Orientation.Right
                this.moveToRight()
            } else {
            }

            // Vertical movement
            if (keys.up.isDown && !keys.down.isDown) {
                this.orientation = Orientation.Up
                this.moveToUp()
            }else if (keys.down.isDown && !keys.up.isDown) {
                this.orientation = Orientation.Down
                this.moveToDown()
            } else {

            }

            if (keys.use.isDown) {
                this.use()
            }

            if (keys.jump.isDown) {
                this.jump()
            }

            if (keys.inventory.isDown) {
                this.openInventory()
            }

            this.afterMove()
        }

        openInventory = debounce(() => {
            this.scene.game.events.emit(EVENT_KEY_OPEN_PLAYER_INVENTORY, { actor: this })
        }, 500)
    }

}