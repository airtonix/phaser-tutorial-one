import { debounce } from 'lodash'

import { Orientation } from '~/Config/constants'
import { Character } from '~/Objects/Characters/Character'

import { Logger } from './Logger'

const log = Logger(module.id)

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
    this.scene = scene
    this.createController()
    scene.events.on('update', this.readInputs)
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

  readInputs = (): void  => {
    const controls = this.controls as IControls
    if (!controls) return
    if (this.isMoving) log(controls)

    // Horizontal movement
    if (controls.left.isDown) {
      this.actor.orientation = Orientation.Left
    } else if (controls.right.isDown) {
      this.actor.orientation = Orientation.Right
    }

    // Vertical movement
    if (controls.up.isDown) {
      this.actor.orientation = Orientation.Up
    } else if (controls.down.isDown) {
      this.actor.orientation = Orientation.Down
    }

    if (controls.use.isDown) {
      this.actor.use()
    }

    if (controls.inventory.isDown) {
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
