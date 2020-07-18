import { get, debounce } from 'lodash'
import { SpriteSheets, Emotes } from '~/constants'
import { Constructor } from '~/Base'
import { WritesLogs } from './WritesLogs'


export interface IEmoteConfig {
  width: integer
  height: integer
  sheet: string
  frames: {
      [frameName: string]: integer
  }
}

export interface IEmoteGroup {
    [name: string]: IEmoteConfig
}

interface IEmotive {
    emotes: IEmoteGroup
}

type EmotiveSprite = Phaser.GameObjects.Sprite

export function CanEmote<TBase extends Constructor>(Base: TBase) {
    return class CanEmote extends WritesLogs(Base) {
        on: Function
        emote: EmotiveSprite

        constructor (...args: any[]) {
            super(...args)
            this.log('CanEmote')
            this.emote = this.createEmoteSprite()
            this.add(this.emote)

            this.on('show-emote', this.handleShowEmote)
        }

        createEmoteSprite (): EmotiveSprite {
            const sprite = this.scene.make.sprite({
                x : 0,
                y: 0,
                key: Emotes.Default.sheet,
            })
            const { width, height, frames } = Emotes.Default
            sprite.setFrame(frames.Blank)
            sprite.setSize(width, height)
            sprite.setOrigin(0.5, 2)
            sprite.setVisible(false)
            return sprite
        }

        handleShowEmote = debounce((event) => {
            this.log('handleShowEmote', event)
            const {frame, timeout} = event
            this.showEmoteFrame(frame, timeout)
        }, 500)

        showEmoteFrame (frame: integer, timeout: integer = 1000): void {
            this.emote.setFrame(frame)
            this.emote.setVisible(true)
            if (!timeout) return

            this.scene.time.addEvent({
                delay: 800,
                callbackScope: this,
                callback: () => {
                    this.emote.setVisible(false)
                }
            })
        }

    }
}
