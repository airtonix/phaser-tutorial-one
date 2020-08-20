import { get, debounce } from 'lodash'
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick';


import { Orientation } from '~/Config/constants'
import { Constructor } from '~/Core/framework';

import { WritesLogs } from './WritesLogs';

export const EVENT_KEY_OPEN_PLAYER_INVENTORY = 'open-player-inventory'

export function IsPlayerControlled<TBase extends Constructor> (Base: TBase) {

  return class IsPlayerControlled extends WritesLogs(Base) {
        isMoving: boolean
        orientation: string
        isIdle: boolean
        joystick: VirtualJoystick
        keyboard: Phaser.Input.Keyboard

        scene: Phaser.Scene
        keys: Phaser.Types.Input.InputConfiguration

        constructor (...args: any[]) {
          super(...args)
          this.log('IsPlayerControlled')

        }

        update (time, delta) {
          super.update(time, delta)
          this.updateKeysPressed(this.keys)
        }

        updateKeysPressed (keys) {
          this.isMoving = keys.left.isDown
            || keys.right.isDown
            || keys.up.isDown
            || keys.down.isDown

          // Horizontal movement
          if (get(keys, 'left.isDown') && !get(keys, 'right.isDown')) {
            this.orientation = Orientation.Left
          } else if (get(keys, 'right.isDown') && !get(keys, 'left.isDown')) {
            this.orientation = Orientation.Right
          }

          // Vertical movement
          if (get(keys, 'up.isDown') && !get(keys, 'down.isDown')) {
            this.orientation = Orientation.Up
          } else if (get(keys, 'down.isDown') && !get(keys, 'up.isDown')) {
            this.orientation = Orientation.Down
          }

          if (get(keys, 'use.isDown')) {
            this.use()
          }

          if (get(keys, 'jump.isDown')) {
            this.jump()
          }

          if (get(keys, 'inventory.isDown')) {
            this.openInventory()
          }
        }

        openInventory = debounce(() => {
          const content = this.scene.game.registry.get('player-inventory')
          this.scene.game.events.emit(EVENT_KEY_OPEN_PLAYER_INVENTORY, {
            actor: this,
            content
          })
        }, 500)
  }

}
