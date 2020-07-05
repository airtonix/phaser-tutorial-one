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
        this.createPlayer()
        this.createNpcs()
        this.createColliders(
            this.player,
            this.npcGroup
        )
        this.initCamera()
    }

    update () {
        this.player && this.player.update(this.keys)
        this.npcs.forEach( npc => npc.update() )
    }

    createPlayer () {
        this.player = new PlayerWarrior({
            scene: this,
            x: this.map.widthInPixels / 2,
            y: this.map.heightInPixels / 2
        })
    }

    createNpcs () {
        this.npcs = []
        this.npcGroup = this.physics.add
            .group(this.npcs)

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
            data.tileset,
            data.tileimage
        )

        this.layers = data.layers
            .reduce((result, definition) => {
                const {
                    key,
                } = definition

                const layer = this.map
                    .createStaticLayer(key, data.tileset, 0 , 0)
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

    createColliders (...actors) {
        const collidables = [
            this.layers.Walls,
            this.layers.Obstacles,
        ]

        actors.forEach(actor => {
            collidables.forEach(collidable =>
                this.physics.add.collider(actor, collidable)
            )
        })
    }

    // addColliders() { }
    initCamera () {
        const {
            widthInPixels,
            heightInPixels
        } = this.map
        this.log('initCamera', { widthInPixels, heightInPixels })
        const mainCamera = this.cameras.main
        mainCamera.setRoundPixels(true)
        mainCamera.setBounds(0, 0, widthInPixels, heightInPixels)
        mainCamera.startFollow(this.player, true, 1, 1)
    }
}
