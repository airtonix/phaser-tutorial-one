import Phaser from 'phaser'
import { BaseScene } from './BaseScene'
import { Player } from '~/Objects/Player'
import { TILE_MAPPING } from './GameSceneConstants'

export class MapScene extends BaseScene {

    mapTileSetName = 'tiles'
    groundLayerName = 'Ground'

    create () {
        super.create()
        const {
            db
        } = this.props
        this.map = this.createMap()
        this.tiles = this.createTiles()
        this.layers = db.layers
            .map(layer => this.createLayer(layer))

        // this.player = this.createActor(new Player({
        //     scene: this.scene.scene
        // }))

        // // Watch the player and layer for collisions,
        // // for the duration of the scene:
        // this.addActorCollisions(this.groundLayer, this.player)
        this.resetCamera()
    }

    resetCamera () {
        this.log('resetCamera')
        const camera = this.cameras.main
        // camera.startFollow(this.player)
        camera.setBounds(0, 0,
            this.map.widthInPixels,
            this.map.heightInPixels)
    }

    createMap () {
        this.log('createMap')
        return this.make.tilemap({
            tileWidth: 48,
            tileHeight: 48,
            width: this.width,
            height: this.height
        })
    }

    createTiles () {
        this.log('createTiles')
        return this.map.addTilesetImage(
            this.mapTileSetName,
            null,
            48, 48, 1, 2
        )
    }

    createLayer (layerDefinition) {
        const {
            name, tileset,
            ...definition
        } = layerDefinition
        this.log(`createLayer: ${name}`)

        const layer = this.map.createBlankDynamicLayer(name, tileset)
        layer.fill(definition.blankTile || TILE_MAPPING.BLANK)
        // this.groundLayer.setCollisionByExclusion(
        //
        // )
        return layer
    }

    createActor (actor) {
        return actor
    }

    addActorCollisions (actor, layer) {
        this.physics.add.collider(actor, layer)
    }

    generateRoom (roomDefinition) {
        const {
            x, y,
            width, height,
            left, right, top, bottom,
            getDoorLocations
        } = roomDefinition
        // These room properties are all in grid units
        // (not pixels units)

        // Fill the room (minus the walls) with mostly
        // clean floor tiles (90% of the time), but
        // occasionally place a dirty tile (10% of the time).
        this.groundLayer.weightedRandomize(
            x + 1,
            y + 1,
            width - 2,
            height - 2,
            TILE_MAPPING.FLOOR
        )

        // Place the room corners tiles
        this.groundLayer.putTileAt(TILE_MAPPING.WALL.TOP_LEFT,
            left, top)
        this.groundLayer.putTileAt(TILE_MAPPING.WALL.TOP_RIGHT,
            right, top)
        this.groundLayer.putTileAt(TILE_MAPPING.WALL.BOTTOM_RIGHT,
            right, bottom)
        this.groundLayer.putTileAt(TILE_MAPPING.WALL.BOTTOM_LEFT,
            left, bottom)

        // Place the non-corner wall tiles using
        // fill with x, y, width, height parameters
        this.groundLayer.weightedRandomize(
            left + 1,
            top,
            width - 2,
            1,
            TILE_MAPPING.WALL.TOP) // Top
        this.groundLayer.weightedRandomize(
            left + 1,
            bottom,
            width - 2,
            1,
            TILE_MAPPING.WALL.BOTTOM) // Bottom
        this.groundLayer.weightedRandomize(
            left,
            top + 1,
            1,
            height - 2,
            TILE_MAPPING.WALL.LEFT) // Left
        this.groundLayer.weightedRandomize(
            right,
            top + 1,
            1,
            height - 2,
            TILE_MAPPING.WALL.RIGHT) // Right

        // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
        // room's location. Each direction has a different door to tile mapping.
        var doors = getDoorLocations() // → Returns an array of {x, y} objects
        for (var i = 0; i < doors.length; i++) {
            if (doors[i].y === 0) {
                this.groundLayer.putTilesAt(
                    TILE_MAPPING.DOOR.TOP,
                    x + doors[i].x - 1,
                    y + doors[i].y)

            } else if (doors[i].y === height - 1) {
                this.groundLayer.putTilesAt(
                    TILE_MAPPING.DOOR.BOTTOM,
                    x + doors[i].x - 1,
                    y + doors[i].y)

            } else if (doors[i].x === 0) {
                this.groundLayer.putTilesAt(
                    TILE_MAPPING.DOOR.LEFT,
                    x + doors[i].x,
                    y + doors[i].y - 1)

            } else if (doors[i].x === width - 1) {
                this.groundLayer.putTilesAt(
                    TILE_MAPPING.DOOR.RIGHT,
                    x + doors[i].x,
                    y + doors[i].y - 1)

            }
        }
    }

    generateRoomStuff (roomDefinition) {
        const {
            x, y,
            centerX, centerY,
            width, height,
            left, right, top, bottom,
            getDoorLocations
        } = roomDefinition
        const rand = Math.random()
        if (rand <= 0.25) {
        // 25% chance of chest
            this.stuffLayer.putTileAt(
                TILE_MAPPING.CHEST,
                centerX,
                centerY)

        } else if (rand <= 0.5) {
        // 50% chance of a pot anywhere in the room
        //  except don't block a door!
            const x = Phaser.Math.Between(
                left + 2,
                right - 2)
            const y = Phaser.Math.Between(
                top + 2,
                bottom - 2)
            this.stuffLayer.weightedRandomize(
                x, y, 1, 1,
                TILE_MAPPING.POT)
        } else {
        // 25% of either 2 or 4 towers,
        // depending on the room size
            if (height >= 9) {
                this.stuffLayer.putTilesAt(
                    TILE_MAPPING.TOWER,
                    centerX - 1,
                    centerY + 1)
                this.stuffLayer.putTilesAt(
                    TILE_MAPPING.TOWER,
                    centerX + 1,
                    centerY + 1)
                this.stuffLayer.putTilesAt(
                    TILE_MAPPING.TOWER,
                    centerX - 1,
                    centerY - 2)
                this.stuffLayer.putTilesAt(
                    TILE_MAPPING.TOWER,
                    centerX + 1,
                    centerY - 2)
            } else {
                this.stuffLayer.putTilesAt(
                    TILE_MAPPING.TOWER,
                    centerX - 1,
                    centerY - 1)
                this.stuffLayer.putTilesAt(
                    TILE_MAPPING.TOWER,
                    centerX + 1,
                    centerY - 1)
            }
        }
    }
}
