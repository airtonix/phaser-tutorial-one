import { get } from 'lodash'
import { Loot } from '~/Items'
import { Constructor } from '~/Base'
import { WritesLogs } from './WritesLogs'
import { IAnimationConfig, IAnimationGroup, IAnimations } from './CanAnimate'

export interface IItem {
    name: string
    description: string
    icon: string
}

export const EVENT_INVENTORY_SHOW_DIALOG: string = 'show-inventory-dialog'
export const EVENT_INVENTORY_HIDE_DIALOG: string = 'hide-inventory-dialog'

export function ContainsItems<TBase extends Constructor>(Base: TBase) {
    return class ContainsItems extends WritesLogs(Base) {
        static LID_STATE_CLOSED = 'close'
        static LID_STATE_OPENED = 'open'
        static CONTENT_STATE_FULL = 'full'
        static CONTENT_STATE_EMPTY = 'empty'

        loot: object
        items: []
        lidState:string = ContainsItems.LID_STATE_CLOSED
        animations: IAnimations
        dialogId: string

        constructor (...args: any[]) {
            super(...args)
            this.log('ContainsItems')
        }

        handlePerformUse () {
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

        handleOpen () {
            this.log('handleOpen')
            this.lidState = ContainsItems.LID_STATE_OPENED
            this.items = Loot.loot(this.loot)
            this.animateLidState()

            if (!this.items.length) return
            this.scene.events.emit(
                EVENT_INVENTORY_SHOW_DIALOG,
                {
                    position: {
                        x: this.x,
                        y: this.y
                    },
                    content: this.items
                })
        }

        handleClose () {
            this.log('handleClose')
            this.lidState = ContainsItems.LID_STATE_CLOSED
            this.scene.events.emit(
                EVENT_INVENTORY_HIDE_DIALOG,
            )
            this.animateLidState()
        }

        animateLidState () {
            if (!this.animations || !Object.keys(this.animations).length) return
            this.log('animateLidState', this.lidState)

            const contentState = this.items.length > 0
                ? ContainsItems.CONTENT_STATE_FULL
                : ContainsItems.CONTENT_STATE_EMPTY

            const animation: IAnimationConfig = get(
                this.animations, [this.lidState, contentState],
                this.animations.idle.default
            )
            this.log('onPerformUse', animation)
            this.animate(animation)
        }
    }

}