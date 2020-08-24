import { get } from 'lodash'

import { Loot } from '~/Items'
import { ILootTable } from '~/Items/Loot'

import { IAnimationConfig, IAnimations, CanAnimate } from './CanAnimate'


export interface IItem {
    name: string
    description: string
    icon: string
}

export const EVENT_KEY_INVENTORY_SHOW_DIALOG = 'show-inventory-dialog'
export const EVENT_KEY_INVENTORY_HIDE_DIALOG = 'hide-inventory-dialog'

export class ContainsItems extends CanAnimate {
    static LID_STATE_CLOSED = 'close'
    static LID_STATE_OPENED = 'open'
    static CONTENT_STATE_FULL = 'full'
    static CONTENT_STATE_EMPTY = 'empty'

    scene: Phaser.Scene
    // TODO: describe loot table interface
    loot: ILootTable
    items: []
    lidState:string = ContainsItems.LID_STATE_CLOSED
    animations: IAnimations
    dialogId: string

    handlePerformUse (): void {
      const lidState = this.lidState
      switch (lidState) {
        case ContainsItems.LID_STATE_CLOSED:
          this.handleOpen()
          break;
        case ContainsItems.LID_STATE_OPENED:
          this.handleClose()
          break;
      }
    }

    handleOpen (): void {
      this.lidState = ContainsItems.LID_STATE_OPENED
      this.items = Loot.loot(this.loot)
      this.animateLidState()

      if (!this.items.length) return

      this.scene.game.events.emit(
        EVENT_KEY_INVENTORY_SHOW_DIALOG,
        { content: this.items })
    }

    handleClose (): void {
      this.lidState = ContainsItems.LID_STATE_CLOSED
      this.scene.game.events.emit(
        EVENT_KEY_INVENTORY_HIDE_DIALOG,
      )
      this.animateLidState()
    }

    animateLidState (): void {
      if (!this.animations || !Object.keys(this.animations).length) return

      const contentState = this.items.length > 0
        ? ContainsItems.CONTENT_STATE_FULL
        : ContainsItems.CONTENT_STATE_EMPTY

      const animation: IAnimationConfig = get(
        this.animations, [this.lidState, contentState],
        this.animations.idle.default
      )
      this.animate(animation)
    }
}