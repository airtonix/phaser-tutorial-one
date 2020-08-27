import { uniqueId } from 'lodash'

import { Logger } from '~/Core/Logger'

export class WritesLogs {
  key: string
  log: typeof console.log

  constructor (
    config: Phaser.Types.Scenes.SettingsConfig
  ) {
    this.log = Logger(config.key || uniqueId())
    this.log('WritesLogs')
  }
}
