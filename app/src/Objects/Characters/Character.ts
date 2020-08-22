import { classes } from 'polytype'

import { CanAnimate } from '~/Mixins/CanAnimate'
import { CanEmote } from '~/Mixins/CanEmote'
import { ShouldDisplay } from '~/Mixins/ShouldDisplay'

export class Character
  extends classes(
    Phaser.GameObjects.Container,
    CanAnimate,
    CanEmote,
    ShouldDisplay
  ) {

  constructor (
    scene: Phaser.Scene,
    x = 0,
    y = 0
  ) {
    super(
      {super: Phaser.GameObjects.Container, arguments: [ scene, x, y ]},
      {super: CanAnimate, arguments: [ scene, x, y ]},
      {super: CanEmote, arguments: [ scene ]},
      {super: ShouldDisplay, arguments: [ scene, x, y ]}
    )
  }
}