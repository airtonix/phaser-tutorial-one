import { BaseScene } from './BaseScene'
import { PlayerWarrior } from '~/Objects/PlayerWarrior'
import { AnimatedTile } from '~/Objects/AnimatedTile'
import { OutlinePipeline } from '~/Shaders/OutlinePipeline'

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

        const { map, tileset } = this.createMap()
        this.map = map
        this.tileset = tileset
        this.layers = this.createLayers(this.map)
        this.animatedTiles = this.animateTiles(this.map, this.tileset)
        this.player = this.createPlayer()

        this.placePlayer()
        this.createNpcs()
        this.createColliders(
            this.player,
            this.npcGroup
        )
        // this.initCamera()

        this.countdown = 450
    }

    update (time, delta) {
        this.animatedTiles.forEach(tile => tile.update(delta))
        this.player && this.player.update(this.keys)
        this.npcs.forEach( npc => npc.update() )
    }

    createPlayer () {
        const player = new PlayerWarrior({
            scene: this,
            x: 0,
            y: 0
        })
        return player
    }

    placePlayer () {
        const StuffLayer = this.map.objects
            .find(obj => obj.name === 'Stuff')
        const start = StuffLayer.objects
            .find(obj => obj.name === 'PlayerStart')
        this.player.x = start.x + start.width / 2
        this.player.y = start.y + start.height / 2
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

        const map = this.make.tilemap({
            key: data.key
        })

        const tileset = map.addTilesetImage(
            data.tileset,
            data.tileimage
        )

        const {
            widthInPixels,
            heightInPixels
        } = map

        this.physics.world.setBounds(0, 0, widthInPixels, heightInPixels)
        this.log('createMap.done')

        return { map, tileset }
    }

    createLayers (map) {
        this.log('createLayers')

        const {
            data
        } = this.props

        return data.layers
            .reduce((result, definition) => {
                const {
                    key,
                } = definition

                const layer = map
                    .createDynamicLayer(key, data.tileset, 0 , 0)

                layer.setCollisionByProperty({ collides: true })

                return {
                    ...result,
                    [key]: layer
                }
            }, {})
    }

    animateTiles (map, tileset) {
        const tileData = tileset.tileData
        // create a list of tileIds that have animation data
        const tileIds = Object.keys(tileData)
            .filter(tileId => tileData[tileId].animation)
            .map(tileId => parseInt(tileId, 10))

        // get a flat list of tiles that are:
        // - from DynamicTilemapLayers only
        // - are in the above list of tileids
        const tilesNeedingAnimation = map.layers
            .filter(layer => layer.tilemapLayer.type === 'DynamicTilemapLayer')
            .reduce((result, layer) => {
                return [
                    ...result,
                    ...layer.data
                ]
            }, [])
            .reduce((result, tileRow) => {
                return [
                    ...result,
                    ...tileRow
                ]
            }, [])
            .filter(tile => tileIds.includes(tile.index - tileset.firstgid))

        // create a animted
        const animatedTiles = tilesNeedingAnimation
            .map(tile => {
                const tileId = tile.index - tileset.firstgid
                return new AnimatedTile(
                    tile,
                    tileData[tileId].animation,
                    tileset.firstgid,
                )
            })

        return animatedTiles
    }

    createColliders (...actors) {
        [
            'Walls',
            'Obstacles',
        ]
            .forEach(layerId => {
                const layer = this.layers[layerId]
                // layer.setCollisionByExclusion([-1])
                layer.setCollisionByProperty({ collides: true })
                layer.setCollisionFromCollisionGroup(true, layer)
                actors.forEach(actor => {
                    this.physics.add.collider(actor, layer)
                })
            })
    }

    /**
     * https://medium.com/@ionejunhong/sprite-outline-with-phaser-3-9c17190b04bc
     */
    outlinePlayer () {
        const player = this.player

        player.sprite.setPipeline(OutlinePipeline.KEY)
        player.sprite.pipeline.setFloat2(
            'uTextureSize',
            player.sprite.texture.getSourceImage().width,
            player.sprite.texture.getSourceImage().height
        )
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
