import { debounce, set, get } from 'lodash'

import { Logs } from '../Core/Logger'

import { CharacterGameObject } from '~/Objects/Characters/Character'


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

@Logs
export class Controllable {
  orientation: string
  isIdle: boolean
  keys: Phaser.Types.Input.InputConfiguration
  // eslint-disable-next-line @typescript-eslint/ban-types
  controls: object

  constructor (
    private scene: Phaser.Scene,
    private entity: CharacterGameObject
  ) {
    this.scene = scene
    this.init()
    scene.events.on('update', this.update)
  }

  init = (): void => {
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


  update = (): void => {
    this.setMovement()
    this.setOrientation()

    // if (controls.use.isDown) {
    //   this.entity.use()
    // }

    // if (controls.inventory.isDown) {
    //   this.openInventory()
    // }
  }

  setMovement (): void {
    const controls = this.controls as IControls
    if (!controls) return

    set(this.entity, 'moving', {
      Left: controls.left.isDown,
      Right: controls.right.isDown,
      Up: controls.up.isDown,
      Down: controls.down.isDown
    })
  }

  setOrientation (): void {
    const moving = get(this.entity, 'moving', {})
    const orientation = Object.keys(moving)
      .filter(key => !!moving[key])
      .join('')
    this.entity.orientation = orientation
  }

  openInventory = debounce(() => {
    const content = this.scene.game.registry.get('player-inventory')
    this.scene.game.events.emit(EVENT_KEY_OPEN_PLAYER_INVENTORY, {
      actor: this,
      content
    })
  }, 500)
}
