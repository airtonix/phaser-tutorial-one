import Phaser from 'phaser'

import { Store } from '~/Store'
import { AnimatedTile } from '~/Objects/AnimatedTile'
import { PlayerWarrior } from '~/Objects/PlayerWarrior'
import * as StuffObjectMap from '~/Objects/StuffObjectMap'
import { Zone } from '~/Store/Zone/ZoneModel'
import { NoZoneMapError } from '~/Store/Zone/Exceptions'

import { BaseScene } from './BaseScene'


interface TileMapHash {
  [key: string]: Phaser.Tilemaps.DynamicTilemapLayer
}

export class MapScene extends BaseScene {
  static key = 'MapScene'

  isInteractive = true
  player: any
  map: Phaser.Tilemaps.Tilemap
  tileset: Phaser.Tilemaps.Tileset
  mapLayers: Phaser.Tilemaps.DynamicTilemapLayer[]
  animatedTiles: AnimatedTile[]
  stuff: any
  countdown = 450

  create (): void {
    if (!Store.currentZone?.map) throw new NoZoneMapError
    this.createLogger(Store.currentZone.map.key)
    this.log('create')

    this.map = this.createMap()
    this.tileset = this.drawMap(this.map)
    this.mapLayers = this.createMapLayers(this.map)
    this.animatedTiles = this.animateTiles(this.map, this.tileset)

    this.player = this.createPlayer()
    this.setLayersColliable(this.mapLayers)
    this.createColliders(this.player, Object.values(this.mapLayers))

    // this.stuff = this.createStuff()
    // this.createColliders(this.player, this.stuff.getChildren())
    // this.initCamera()
  }

  update (time, delta): void {
    this.animatedTiles.forEach(tile => tile.update(delta))
    this.player && this.player.update(time, delta)
    // this.stuff.getChildren().forEach(thing => thing.update(time, delta))
  }

  createPlayer (): Phaser.GameObjects.Container {
    const player = new PlayerWarrior(this)
    const layer = Store.currentZone?.map.objectLayer

    if (!layer) return player

    const start = layer.entities.find(obj => obj.name === 'PlayerStart')

    player.setDepth(layer.depth + 1)
    player.setPosition(
      start.x + start.width / 2,
      start.y + start.height / 2
    )
    return player
  }

  createStuff (): Phaser.GameObjects.Group {
    const {
      Stuff: {
        props: { depth },
        objects
      }
    } = this.objectLayers

    const stuff = objects
      .filter(definition => !!definition.type)
      .map(({ type, x, y, width, height }) => {
        const ThingClass = StuffObjectMap[type]
        const thing = new ThingClass(
          this,
          x + width / 2,
          y + height / 2
        )
        thing.setDepth(depth)
        return thing
      })

    return this.physics.add.group(stuff)
  }

  drawMap (map: Phaser.Tilemaps.Tilemap): Phaser.Tilemaps.Tileset {
    const {
      tileset: currentTileSet,
      tileimage: curentTileImage
    } = Store.currentZone?.map

    const tileset = map.addTilesetImage(
      currentTileSet,
      curentTileImage
    )
    this.log('drawMap.done')
    return tileset
  }

  createMap (): Phaser.Tilemaps.Tilemap {
    this.log('createMap')
    const {
      key
    } = Store.currentZone.map

    const map = this.make.tilemap({ key })

    const {
      widthInPixels,
      heightInPixels
    } = map

    this.physics.world.setBounds(0, 0, widthInPixels, heightInPixels)
    this.log('createMap.done')

    return map
  }

  createMapLayers (map: Phaser.Tilemaps.Tilemap): TileMapHash {
    this.log('createMapLayers')
    const layers = map.layers
      .reduce((result, { name, properties }) => {
        this.log('createMapLayers.layer', name)
        const layer = map.createDynamicLayer(name, this.tileset.name, 0, 0)
        const depth = properties.find(({ name }) => name === 'depth')
        layer.setDepth(depth.value)
        return {
          ...result,
          [name]: layer
        }
      }, {})

    return layers
  }

  animateTiles (
    map: Phaser.Tilemaps.Tilemap,
    tileset: Phaser.Tilemaps.Tileset
  ): AnimatedTile[] {
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

  onActorCollide = (...actors: Phaser.GameObjects.GameObject[]): void => {
    this.log('onActorCollide', actors)
    actors.forEach(actor => {
      if (typeof actor.emit === 'function') {
        actor.emit('collide', { actors })
      }
    })
  }

  setLayersColliable (layers): void {
    Object.keys(layers)
      .forEach(layerId => {
        this.log(`setLayersCollidable: ${layerId}`)
        const layer = layers[layerId]
        layer.setCollisionByProperty({ collides: true })
      })
  }

  createColliders (actors, collidables) {
    // if (!Array.isArray(collidables)) return

    collidables.forEach(collidable => {
      this.log(`createColliders: ${collidable}`)
      this.physics.add.collider(actors, collidable, this.onActorCollide, null, this)
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
