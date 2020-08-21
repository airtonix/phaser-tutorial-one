import { classes } from 'polytype'

import { ContainerDialog } from '~/Objects/ContainerDialog'
import { ActorUi } from '~/Objects/ActorUi'
import { EVENT_KEY_INVENTORY_SHOW_DIALOG, EVENT_KEY_INVENTORY_HIDE_DIALOG } from '~/Mixins/ContainsItems'
import { EVENT_KEY_OPEN_PLAYER_INVENTORY } from '~/Core/PlayerController'
import { Store } from '~/Store'

import { BaseScene } from './BaseScene'

export class InterfaceScene
  extends classes(
    BaseScene,
  ) {
    static key = 'InterfaceScene'

    gamebar: Phaser.GameObjects.Graphics
    player: ActorUi
    playerInventory: ContainerDialog
    containerInventory: ContainerDialog

    constructor () {
      super(
        { super: BaseScene, arguments: [{ key: InterfaceScene.key }] },
      )
      this.log('constructed')
    }

    create (): void {
      super.create()
      this.log('creating')
      const y = Number(this.game.config.height) - 22
      const w = Number(this.game.config.width)

      this.gamebar = this.createBg(
        0, y, w, 22,
        0x333333,
      )

      this.log('Player', Store.player)
      this.playerInventory = new ContainerDialog(this, {
        key: 'PlayerInventory',
        direction: ContainerDialog.DIRECTIONS.DIRECTION_VERTICAL,
        lanes: 5,
        height: 200,
        anchor: {
          left: 'left+50',
          bottom: 'bottom-26'
        },
        items: Store.player
          ? Store.player.character?.inventory
          : []
      })

      this.containerInventory = new ContainerDialog(this, {
        key: 'ContainerInventory',
        direction: ContainerDialog.DIRECTIONS.DIRECTION_VERTICAL,
        lanes: 5,
        height: 200,
        anchor: {
          left: 'left+250',
          bottom: 'bottom-26'
        }
      })


      this.player = new ActorUi(this, {
        x: 0,
        y: Number(this.game.config.height) - 52,
        onClick: this.playerInventory.toggle
      })

      this.game.events
        .on(EVENT_KEY_OPEN_PLAYER_INVENTORY,
          this.playerInventory.toggle)

      this.game.events
        .on(EVENT_KEY_INVENTORY_SHOW_DIALOG,
          () => {
            this.containerInventory.open()
            this.playerInventory.open()
          })
      this.game.events
        .on(EVENT_KEY_INVENTORY_HIDE_DIALOG,
          () => {
            this.containerInventory.close()
            this.playerInventory.close()
          })
    }

    togglePlayerInventory = (): void => {
      this.playerInventory.toggle()
    }

    createBg (
      x: integer,
      y: integer,
      width: integer,
      height: integer,
      bgColor: integer
    ): Phaser.GameObjects.Graphics {
      const bg = this.make.graphics({ x, y })
      bg.fillStyle(bgColor, 1)
      bg.lineStyle(2, 0x999999, 0.5)
      bg.strokeRect(0, 0, width, 2)
      bg.fillRect(0, 0, width, height)

      this.add.existing(bg)

      return bg
    }

    update (): void {
      this.player.update()
    }
}
