import { AbstractBaseScene } from '~/core/BaseScene'
import { Logger } from '~/core/Logger'

const log = Logger(module.id)

export abstract class AbstractPreloadingScene extends AbstractBaseScene {

  public preload (): void {
    log('preload')

    const progress = this.add.graphics()

    this.load.on('fileprogress', (file, value) => {
      log(file, value)
      progress.clear()
      progress.fillStyle(0xffffff, 0.75)
      progress.fillRect(700 - (value * 600), 250, value * 600, 100)
    })

  }

}
