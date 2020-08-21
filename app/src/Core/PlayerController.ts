import { debounce } from 'lodash'

import { Orientation } from '~/Config/constants'
import { Character } from '~/Objects/Characters/Character'



export interface IControlKey {
  isDown: boolean
}

export interface IControls {
  up: IControlKey,
  down: IControlKey,
  left: IControlKey,
  right: IControlKey,
  use: IControlKey,
  inventory: IControlKey,
}

export const EVENT_KEY_OPEN_PLAYER_INVENTORY = 'event-player-inventory-open'

export class PlayerController {
  orientation: string
  isIdle: boolean
  keys: Phaser.Types.Input.InputConfiguration
  // eslint-disable-next-line @typescript-eslint/ban-types
  controls: object

  constructor (
    private scene: Phaser.Scene,
    private actor: Character
  ) {
    this.createController()
    this.scene.on('update', this.update)
  }

  createController = (): void => {
    this.controls = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      use: Phaser.Input.Keyboard.KeyCodes.E,
      inventory: Phaser.Input.Keyboard.KeyCodes.I,
    })
  }

  get isMoving (): boolean {
    const controls = this.controls as IControls

    return controls.left.isDown
    || controls.right.isDown
    || controls.up.isDown
    || controls.down.isDown
  }

  update (): void {
    const controls = this.controls as IControls

    const {
      left, right,
      up, down,
      use, inventory
    } = controls

    // Horizontal movement
    if (left.isDown) {
      this.orientation = Orientation.Left
    } else if (right.isDown) {
      this.orientation = Orientation.Right
    }

    // Vertical movement
    if (up.isDown) {
      this.orientation = Orientation.Up
    } else if (down.isDown) {
      this.orientation = Orientation.Down
    }

    if (use.isDown) {
      this.actor.use()
    }

    if (inventory.isDown) {
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
