import { Sizer, RoundRectangle } from 'phaser3-rex-plugins/templates/ui/ui-components'

import { Logger } from '~/Core/Logger'
import { ContainerDialog } from '~/Objects/Ui/ContainerDialog'
// import { ActorUi } from '~/Objects/Ui/ActorUi'
import { EVENT_KEY_INVENTORY_SHOW_DIALOG, EVENT_KEY_INVENTORY_HIDE_DIALOG } from '~/Mixins/ContainsItems'
import { EVENT_KEY_OPEN_PLAYER_INVENTORY } from '~/Mixins/Controllable'
import { Store } from '~/Store'
import { COLOURS } from '~/Config/constants'
import { Button } from '~/Objects/Ui/Button'

import { MenuScene } from './MenuScene'

const log = Logger(module.id)

export class InterfaceScene extends Phaser.Scene {
  static key = 'InterfaceScene'

  gamebar: Phaser.GameObjects.Graphics
  // player: ActorUi
  playerInventory: ContainerDialog
  containerInventory: ContainerDialog

  constructor () {
    super({ key: InterfaceScene.key })
    log('constructed')
  }

  create (): void {
    log('creating')
    const y = Number(this.game.config.height) - 21
    const w = Number(this.game.config.width)

    this.gamebar = this.createBg( w / 2, y, w, 40, COLOURS.Grey.Dark)
    this.menuButton = new Button(this, {
      label: 'menu',
      onClick: () => {
        this.scene.start(MenuScene.key)
      }
    })
    this.gamebar.add(this.menuButton)
    this.gamebar.layout()

    // log('Player', Store.player)
    // this.playerInventory = new ContainerDialog(this, {
    //   key: 'PlayerInventory',
    //   direction: ContainerDialog.DIRECTIONS.DIRECTION_VERTICAL,
    //   lanes: 5,
    //   height: 200,
    //   anchor: {
    //     left: 'left+50',
    //     bottom: 'bottom-26'
    //   },
    //   items: Store.player
    //     ? Store.player.character?.inventory
    //     : []
    // })

    // this.containerInventory = new ContainerDialog(this, {
    //   key: 'ContainerInventory',
    //   direction: ContainerDialog.DIRECTIONS.DIRECTION_VERTICAL,
    //   lanes: 5,
    //   height: 200,
    //   anchor: {
    //     left: 'left+250',
    //     bottom: 'bottom-26'
    //   }
    // })

    // this.playerAvatar = new ActorUi(this, {
    //   x: 0,
    //   y: Number(this.game.config.height) - 52,
    //   onClick: this.playerInventory.toggle
    // })

    // this.game.events
    //   .on(EVENT_KEY_OPEN_PLAYER_INVENTORY,
    //     this.playerInventory.toggle)

    // this.game.events
    //   .on(EVENT_KEY_INVENTORY_SHOW_DIALOG,
    //     () => {
    //       this.containerInventory.open()
    //       this.playerInventory.open()
    //     })

    // this.game.events
    //   .on(EVENT_KEY_INVENTORY_HIDE_DIALOG,
    //     () => {
    //       this.containerInventory.close()
    //       this.playerInventory.close()
    //     })
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
    const bar = new Sizer(this, {
      x, y, width, height,
      orientation: 'x'
    })
    const background = new RoundRectangle(
      this, 0, 0, 0, 0, 0, bgColor
    )
    bar.addBackground(background)
    this.add.existing(background)
    this.add.existing(bar)
    bar.layout()
    log('bar.created')
    return bar
  }

  update (): void {
    // this.player.update()
  }
}
