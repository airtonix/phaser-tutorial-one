import { BaseScene } from './BaseScene'
import { PlayerWarrior } from '~/Objects/PlayerWarrior'

export class MapScene extends BaseScene {

    constructor (props) {
        super({
            isInteractive: true,
            ...props
        })
        this.log('[MapScene] constructed')
    }

    create () {
        super.create()
        this.log('[MapScene] create')

        this.createMap()

        this.player = new PlayerWarrior({
            scene: this,
            x: this.map.widthInPixels / 2,
            y: this.map.heightInPixels / 2
        })
        this.player.sprite.setDisplaySize(48, 64)
        this.npcs = []

        this.initCamera()
    }

    update () {
        this.player && this.player.update(this.keys)
        this.npcs.forEach( npc => npc.update() )
    }

    createMap () {
        this.log('createMap')
        const {
            data
        } = this.props

        this.map = this.make.tilemap({
            key: data.key
        })

        this.map.addTilesetImage(
            data.tilesetname,
            data.tileimagename
        )

        this.layers = data.layers
            .reduce((result, definition) => {
                const {
                    key,
                } = definition

                const layer = this.map
                    .createStaticLayer(key, data.tilesetname, 0 , 0)
                layer.setCollisionByProperty({ collides: true })

                return {
                    ...result,
                    [key]: layer
                }
            }, {})

        const {
            widthInPixels,
            heightInPixels
        } = this.map

        this.physics.world.setBounds(0, 0, widthInPixels, heightInPixels)
        this.log('createMap.done')
    }

    // addColliders() { }
    initCamera () {
        const {
            widthInPixels,
            heightInPixels
        } = this.map
        this.log('initCamera', { widthInPixels, heightInPixels })
        this.cameras.main.setRoundPixels(true)
        this.cameras.main.setBounds(0, 0, widthInPixels, heightInPixels)
        this.cameras.main.startFollow(this.player, true, 1, 1)
    }
}
