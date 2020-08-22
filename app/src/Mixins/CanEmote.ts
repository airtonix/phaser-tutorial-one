import { debounce } from 'lodash'


import { Emotes } from '~/Config/constants'
import { Constructor } from '~/Core/framework'

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

export const EVENT_KEY_SHOW_EMOTE = 'show-emote'

type EmotiveSprite = Phaser.GameObjects.Sprite

export class CanEmote extends Phaser.GameObjects.Container {
  scene: Phaser.Scene
  emote: EmotiveSprite

  constructor (
    scene: Phaser.Scene
  ) {
    super(scene)

    this.scene = scene
    this.emote = this.createEmoteSprite()
    this.add(this.emote)
    this.on(EVENT_KEY_SHOW_EMOTE, this.handleShowEmote)
  }

  createEmoteSprite (): EmotiveSprite {
    const sprite = new Phaser.GameObjects.Sprite(
      this.scene, 0, 0, Emotes.Default.sheet
    )
    const { width, height, frames } = Emotes.Default
    sprite.setFrame(frames.Blank)
    sprite.setSize(width, height)
    sprite.setOrigin(0.5, 2)
    sprite.setVisible(false)
    return sprite
  }

  handleShowEmote = debounce((event) => {
    const { frame, timeout } = event
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
