import Phaser from 'phaser'
import { classes } from 'polytype'

import { WritesLogs } from '~/Mixins/WritesLogs'

export class BaseScene extends classes(
  Phaser.Scene,
  WritesLogs
) {
    isInteractive: boolean
    key: string

    constructor (
      config: Phaser.Types.Scenes.SettingsConfig
    ) {
      super(
        {super: Phaser.Scene, arguments: [ config ]},
        {super: WritesLogs, arguments: [ config ]},
      )
    }

}
