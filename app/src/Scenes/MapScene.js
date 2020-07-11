import Phaser from 'phaser'
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
        this.log('constructed')
    }

    create () {
        super.create()
        this.log('create')

        const { map, tileset } = this.createMap()
        this.map = map
        this.tileset = tileset
        this.layers = this.createLayers(this.map)
        this.animatedTiles = this.animateTiles(this.map, this.tileset)
        this.player = this.createPlayer()
        if (this.layers.Walls) this.renderLayerDebug(this.layers.Walls)

        this.placePlayer()
        this.createNpcs()
        this.createColliders(
            this.player,
            this.npcGroup
        )
        this.initCamera()

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
        const depth = StuffLayer.properties
            .find(({ name }) => name === 'depth')
        const start = StuffLayer.objects
            .find(obj => obj.name === 'PlayerStart')

        this.player.setDepth(depth.value + 1)
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
        this.log('createLayers', map.layers.map(layer => layer.name).join())
        const layers = map.layers
            .reduce((result, { name, properties }) => {
                const layer = map.createDynamicLayer(name, this.tileset.name, 0 , 0)
                const depth = properties.find(({ name }) => name === 'depth')
                layer.setDepth(depth.value)
                return {
                    ...result,
                    [name]: layer
                }
            }, {})

        return layers
    }

    renderLayerDebug = (layer) => {
        this.log('adding debug layer to', layer)
        const debugGraphics = this.add.graphics().setAlpha(0.75)
        layer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        })
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
            .filter(layer => layer &&
                             layer.tilemapLayer &&
                             layer.tilemapLayer.type === 'DynamicTilemapLayer')
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

    onActorCollide = (actor, tile) => {
        this.log('onActorCollide', actor, tile)
        actor.idle()
    }

    createColliders (...actors) {
        Object.keys(this.layers)
            .forEach(layerId => {
                this.log(`${layerId}.creatColliders`)
                const layer = this.layers[layerId]
                layer.setCollisionByProperty({ collides: true })
                actors.forEach(actor => {
                    this.physics.add.collider(actor, layer, this.onActorCollide, null, this)
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
