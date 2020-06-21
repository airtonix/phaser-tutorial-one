import { Logger } from '~/core/Logger'
import { AbstractPreloadingScene } from '~/core/PreloadingScene'

const log = Logger(module.id)

export class BootScene extends AbstractPreloadingScene {

  constructor () {
    log('construct')
    super({ key: 'Boot' })
  }

  public preload (): void {
    super.preload()
    log('preload')
    // this.load.image(Sprites.Actor)
    // this.load.image(Sprites.World)
  }

  public create (): void {
    log('create')
  }
}
