import { BaseImage } from '~/core/BaseImage'

export class MenuBackgroundImage extends BaseImage {
    name = 'menu-background'

    constructor () {
        super()
        log('construct')
    }
}