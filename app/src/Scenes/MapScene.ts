import Phaser from 'phaser'

import { Store } from '~/Store'
import { AnimatedTile } from '~/Objects/AnimatedTile'
import { PlayerWarrior } from '~/Objects/CharacterWarrior'
import { NoZoneMapError } from '~/Store/Zone/Exceptions'
import { WritesLogs } from '~/Mixins/WritesLogs'
import { SidekickGoblen } from '~/Objects/CharacterGoblin'

import { BaseScene } from './BaseScene'

interface TileMapHash {
  [key: string]: Phaser.Tilemaps.DynamicTilemapLayer
}

@WritesLogs
export class MapScene extends BaseScene {
  static key = 'MapScene'

  isInteractive = true
  countdown = 450

  player: any
  containers: Phaser.GameObjects.Group
  portals: Phaser.GameObjects.Group

  map: Phaser.Tilemaps.Tilemap
  tileset: Phaser.Tilemaps.Tileset
  mapLayers: Phaser.Tilemaps.DynamicTilemapLayer[]
  animatedTiles: AnimatedTile[]

  create (): void {
    this.cameras.main.fadeIn(200, 0, 0, 0)

    if (!Store.currentZone?.map) throw new NoZoneMapError
    this.createLogger(Store.currentZone.map.key)
    this.log('create', Store.currentZone)

    this.map = this.createMap()
    this.tileset = this.drawMap(this.map)
    this.mapLayers = this.createMapLayers(this.map)
    this.animatedTiles = this.animateTiles(this.map, this.tileset)

    this.player = this.createPlayer()
    this.setLayersColliable(this.mapLayers)
    this.createColliders(this.player, Object.values(this.mapLayers))

    this.sidekick = new SidekickGoblen(this)
    this.sidekick.setDepth(Store.player?.character.depth + 1)
    this.sidekick.setPosition(this.player.x, this.player.y)

    if (Store.currentZone?.containers) {
      this.containers = this.createContainers()
      this.createColliders(this.player, this.containers.getChildren())
    }

    if (Store.currentZone?.portals) {
      this.portals = this.createPortals()
      this.createOverlaps(this.player, this.portals.getChildren())
    }
    // this.initCamera()
  }

  update (time: number, delta: number): void {
    this.animatedTiles.forEach(tile => tile.update(delta))
    this.player && this.player.update(time, delta)
    this.sidekick && this.sidekick.update(time, delta)
    this.portals.getChildren().forEach(portal => portal.update(time, delta))
    this.containers.getChildren().forEach(container => container.update(time, delta))
  }

  createPlayer (): Phaser.GameObjects.Container {
    const player = new PlayerWarrior(this)
    const playerCharacter = Store.player?.character
    if (!playerCharacter) player

    const { x, y, depth } = playerCharacter

    player.setDepth(depth + 1)

    player.setPosition(x, y)
    this.log('createPlayer', { x, y, depth })
    return player
  }

  createContainers (): Phaser.GameObjects.Group {
    const containers = Store.currentZone?.containers
      .map((container) => container.createGameObject(this))
    return this.physics.add.group(containers)
  }

  createPortals (): Phaser.GameObjects.Group {
    const portals = Store.currentZone?.portals
      .map((portal) => portal.createGameObject(this))
    return this.physics.add.group(portals)
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
        const depth = properties.find(({ name }) => name === 'depth')
        this.log('createMapLayers.layer', name, depth?.value)
        const layer = map.createDynamicLayer(name, this.tileset.name, 0, 0)
        if (depth) layer.setDepth(depth.value)

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

  onActorOverlap = (...actors: Phaser.GameObjects.GameObject[]): void => {
    actors.forEach(actor => {
      if (typeof actor.emit === 'function') {
        actor.emit('overlap', { actors })
      }
    })
  }

  setLayersColliable (layers: Phaser.Tilemaps.DynamicTilemapLayer): void {
    Object.keys(layers)
      .forEach(layerId => {
        this.log(`setLayersCollidable: ${layerId}`)
        const layer = layers[layerId]
        layer.setCollisionByProperty({ collides: true })
      })
  }

  createColliders (actors, collidables) {
    this.log('createColliders')
    this.physics.add.collider(
      actors,
      collidables,
      this.onActorCollide
    )
  }

  createOverlaps (actors, collidables) {
    this.log('createColliders')
    this.physics.add.overlap(
      actors,
      collidables,
      this.onActorOverlap
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
