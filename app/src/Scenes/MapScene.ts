import Phaser from 'phaser'
import PhaserNavmeshPlugin, { PhaserNavmesh } from 'phaser-navmesh'

import { Logger } from '~/Core/Logger'
import { Store } from '~/Store'
import { AnimatedTile } from '~/Objects/AnimatedTile'
import { NoZoneMapError } from '~/Store/Zone/Exceptions'
// import { SidekickGoblin } from '~/Objects/Characters/CharacterGoblin'
import { Character } from '~/Objects/Characters/Character'
import { NoMapError } from '~/Store/Map/Exceptions'
import { Controllable } from '~/Mixins/Controllable'

interface TileMapLayerHash {
  [key: string]: Phaser.Tilemaps.DynamicTilemapLayer
}
const log = Logger(module.id)

export class MapScene extends Phaser.Scene {
  static key = 'MapScene'

  isInteractive = true
  countdown = 450

  player: Character
  sidekick: Character

  containers: Phaser.GameObjects.Group
  portals: Phaser.GameObjects.Group

  map: Phaser.Tilemaps.Tilemap
  navMesh: PhaserNavmesh
  navMeshPlugin: PhaserNavmeshPlugin
  tileset: Phaser.Tilemaps.Tileset | undefined
  mapLayers: TileMapLayerHash
  animatedTiles: AnimatedTile[]

  constructor () {
    super({ key: MapScene.key })
    log('constructed')
  }

  create (): void {
    this.cameras.main.fadeIn(200, 0, 0, 0)
    if (!Store.currentZone?.map) throw new NoZoneMapError

    log('create', Store.currentZone)

    this.map = this.createMap()
    this.tileset = this.drawMap(this.map)
    this.mapLayers = this.createMapLayers(this.map)
    this.animatedTiles = this.animateTiles(this.map, this.tileset)
    this.navMesh = this.createNavMesh()

    this.player = this.createPlayer()

    this.setLayersColliable(this.mapLayers)
    this.createColliders(this.player, Object.values(this.mapLayers))

    // this.sidekick = this.createPlayerSidekick()
    // this.createColliders(this.sidekick, Object.values(this.mapLayers))

    // if (Store.currentZone?.containers) {
    //   this.containers = this.createContainers()
    //   this.createColliders(this.player, this.containers.getChildren())
    // }

    if (Store.currentZone?.portals) {
      this.portals = this.createPortals()
      this.createOverlaps(this.player, this.portals.getChildren())
    }
    // // this.initCamera()
  }

  update (
    time: number,
    delta: number
  ): void {
    this.animatedTiles.forEach(tile => tile.update(delta))
  }

  createPlayer (): Character | undefined {
    const playerCharacter = Store.player?.character
    if (!playerCharacter) return

    const player = playerCharacter.createGameObject(this)
    player.setController(
      new Controllable(this, player)
    )
    return player
  }

  createPlayerSidekick (): Character {
    const sidekick = new SidekickGoblin(
      this,
      this.navMesh
    )

    const {
      depth, x, y
    } = this.player

    sidekick.setDepth(depth + 1)
    sidekick.setPosition(x, y)

    return sidekick
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

  createNavMesh (): PhaserNavmesh {
    const map = Store.currentZone?.map

    if (!map) {
      throw new NoMapError()
    }

    const navMesh = this.navMeshPlugin
      .buildMeshFromTiled(
        `${map.key}Mesh`,
        this.map.getObjectLayer('NavMesh'),
        5
      )

    const graphics = this.add
      .graphics({ x: 0, y: 0 })
      .setAlpha(0.25)
      .setDepth(1000);

    navMesh.enableDebug(graphics);

    return navMesh
  }

  drawMap (
    tilemap: Phaser.Tilemaps.Tilemap
  ): Phaser.Tilemaps.Tileset | undefined {
    const map = Store.currentZone?.map

    if (!map) {
      throw new NoMapError()
    }

    const {
      tileset: currentTileSet,
      tileimage: curentTileImage
    } = map

    const tileset = tilemap.addTilesetImage(
      currentTileSet,
      curentTileImage
    )

    log('drawMap.done')

    return tileset
  }

  createMap (): Phaser.Tilemaps.Tilemap {
    log('createMap')

    const map = Store.currentZone?.map

    if (!map) {
      throw new NoMapError()
    }

    const tilemap = this.make.tilemap({ key: map.key })

    const {
      widthInPixels,
      heightInPixels
    } = tilemap

    this.physics.world.setBounds(0, 0, widthInPixels, heightInPixels)
    log('createMap.done')

    return tilemap
  }

  createMapLayers (
    tilemap: Phaser.Tilemaps.Tilemap
  ): TileMapLayerHash {
    log('createMapLayers')

    const map = Store.currentZone?.map
    const tileSetName = this.tileset?.name

    if (!map || !tileSetName) {
      throw new NoMapError()
    }

    const layers = map.layers
      .reduce((result, {
        name,
        depth,
      }) => {
        log('createMapLayers.layer', name, depth)

        const layer = tilemap.createDynamicLayer(
          name,
          tileSetName,
          0, 0
        )

        if (layer && depth) layer.setDepth(depth)

        return {
          ...result,
          [name]: layer
        }
      }, {})

    return layers
  }

  animateTiles (
    map: Phaser.Tilemaps.Tilemap,
    tileset: Phaser.Tilemaps.Tileset | undefined
  ): AnimatedTile[] {
    if (!tileset) throw new NoMapError()

    const tileData = tileset.tileData

    // create a list of tileIds that have animation data
    const tileIds = Object.keys(tileData)
      .filter(tileId => tileData[tileId].animation)
      .map(tileId => parseInt(tileId, 10))

    // get a flat list of tiles that are:
    // - from DynamicTilemapLayers only
    // - are in the above list of tileids
    const dynamicLayers = Array.from(map.layers)
      .filter(layer => layer &&
        layer.tilemapLayer &&
        layer.tilemapLayer.type === 'DynamicTilemapLayer'
      )

    const tileDataRows = dynamicLayers
      .reduce((
        result: Phaser.Tilemaps.Tile[][],
        layer: Phaser.Tilemaps.LayerData
      ) => {
        return [
          ...result,
          ...layer.data
        ]
      }, [])

    const tilesNeedingAnimation = tileDataRows
      .reduce((
        result: Phaser.Tilemaps.Tile[],
        tiles: Phaser.Tilemaps.Tile[]
      ) => {
        return [
          ...result,
          ...tiles
        ]
      }, [])
      .filter((
        tile: Phaser.Tilemaps.Tile
      ) =>
        tileIds.includes(tile.index - tileset.firstgid)
      )

    // create a animted
    const animatedTiles = tilesNeedingAnimation
      .map((
        tile: Phaser.Tilemaps.Tile
      ) => {
        const tileId = tile.index - tileset.firstgid
        return new AnimatedTile(
          tile,
          tileData[tileId].animation,
          tileset.firstgid,
        )
      })

    return animatedTiles
  }

  onActorCollide = (
    ...actors: Phaser.GameObjects.GameObject[]
  ): void => {
    log('onActorCollide', actors)
    actors.forEach(actor => {
      if (typeof actor.emit === 'function') {
        actor.emit('collide', { actors })
      }
    })
  }

  onActorOverlap = (
    ...actors: Phaser.GameObjects.GameObject[]
  ): void => {
    actors.forEach(actor => {
      if (typeof actor.emit === 'function') {
        actor.emit('overlap', { actors })
      }
    })
  }

  setLayersColliable (
    layers: TileMapLayerHash
  ): void {
    Object.keys(layers)
      .map(layerId => layers[layerId])
      .filter(Boolean)
      .forEach(mapLayer => {
        log(`setLayersCollidable: ${mapLayer.layer.name}`)
        mapLayer.setCollisionByProperty({ collides: true })
      })
  }

  createColliders (
    actors: Character,
    collidables: Phaser.GameObjects.GameObject[]
  ): void {
    log('createColliders')
    this.physics.add.collider(
      actors,
      collidables,
      this.onActorCollide
    )
  }

  createOverlaps (
    actors: Character,
    collidables: Phaser.GameObjects.GameObject[]
  ): void {
    log('createColliders')
    this.physics.add.overlap(
      actors,
      collidables,
      this.onActorOverlap
    )
  }

  initCamera (): void {
    const {
      widthInPixels,
      heightInPixels
    } = this.map
    log('initCamera', { widthInPixels, heightInPixels })
    const mainCamera = this.cameras.main
    mainCamera.setRoundPixels(true)
    mainCamera.setBounds(0, 0, widthInPixels, heightInPixels)
    mainCamera.startFollow(this.player, true, 1, 1)
  }
}
