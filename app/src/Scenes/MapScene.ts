import Phaser from 'phaser'
import PhaserNavmeshPlugin, { PhaserNavmesh } from 'phaser-navmesh'

import { Logger } from '~/Core/Logger'
import { Store } from '~/Store'
import { AnimatedTile } from '~/Objects/AnimatedTile'
import { NoZoneMapError } from '~/Store/Zone/Exceptions'
// import { SidekickGoblin } from '~/Objects/Characters/CharacterGoblin'
import { CharacterGameObject } from '~/Objects/Characters/Character'
import { NoMapError } from '~/Store/Map/Exceptions'
import { PlayerControlStrategy } from '~/Strategies/PlayerControlStrategy'
import { NavMeshControlStrategy } from '~/Strategies/NavMeshControlStrategy'
import { reaction } from 'mobx'
import { ContainerModel } from '~/Store/Entity/ContainerEntityModel'
import { PortalModel } from '~/Store/Entity/PortalEntityModel'
import { CharacterModel } from '~/Store/Character/CharacterModel'
import { PlayerFollowerBehaviourStrategy } from '~/Behaviours/PlayerFollowerBehaviourStrategy'

interface TileMapLayerHash {
  [key: string]: Phaser.Tilemaps.DynamicTilemapLayer
}
const log = Logger(module.id)

export class MapScene extends Phaser.Scene {
  static key = 'MapScene'

  isInteractive = true
  countdown = 450

  player: CharacterGameObject
  sidekick: CharacterGameObject

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
    this.setLayersColliable(this.mapLayers)

    this.navMesh = this.createNavMesh()

    reaction(
      () => Store.player?.character,
      (character: CharacterModel) => this.createPlayer(character),
      { fireImmediately: true }
    )

    reaction(
      () => Store.player?.character?.getFollowers(),
      (followers: CharacterModel[]) => this.createFollowers(followers),
      { fireImmediately: true }
    )

    reaction(
      () => Store.currentZone?.containers,
      (containers: ContainerModel[]) => this.createContainers(containers),
      { fireImmediately: true }
    )

    reaction(
      () => Store.currentZone?.portals,
      (portals: PortalModel[]) => this.createPortals(portals),
      { fireImmediately: true }
    )
  }

  update (
    time: number,
    delta: number
  ): void {
    this.animatedTiles.forEach(tile => tile.update(delta))
  }

  createPlayer (playerCharacter: CharacterModel): void {
    if (!playerCharacter) return

    const player = playerCharacter.createGameObject(this)
    player.setControllerStrategy(
      new PlayerControlStrategy(
        this,
        player
      )
    )

    this.createColliders(player, Object.values(this.mapLayers))
    this.initCamera(player)

    this.player = player
  }

  createFollowers (characters: CharacterModel[]) {
    if (!characters || characters.length <= 0) return

    characters
      // filter out models that already have gameobjects
      .filter(character => !character.gameobject)
      .forEach(character => {
        const follower = character.createGameObject(this)
        follower.setControllerStrategy(
          new NavMeshControlStrategy(
            this,
            follower,
            this.navMesh
          )
        )
        follower.setBehaviourStrategy(
          new PlayerFollowerBehaviourStrategy(
            follower,
            this.player
          )
        )
        this.createColliders(follower, Object.values(this.mapLayers))
      })
  }

  createContainers (containers: ContainerModel[]): void {
    if (!containers || containers.length <= 0) return

    const containerObjects = containers
      .map((container) => container.createGameObject(this))
      
    this.containers = this.physics.add.group(containerObjects)

    if (!this.player) return
    this.createColliders(this.player, this.containers.getChildren())
  }

  createPortals (portals: PortalModel[]): void {
    if (!portals || portals.length <= 0) return

    const portalObjects = portals
      .map((portal) => portal.createGameObject(this))
    this.portals = this.physics.add.group(portalObjects)
    if (!this.player) return
    this.createOverlaps(this.player, this.portals.getChildren())
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
    actors: CharacterGameObject,
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
    actors: CharacterGameObject,
    collidables: Phaser.GameObjects.GameObject[]
  ): void {
    log('createColliders')
    this.physics.add.overlap(
      actors,
      collidables,
      this.onActorOverlap
    )
  }

  initCamera (player): void {
    const {
      widthInPixels,
      heightInPixels
    } = this.map
    log('initCamera', { widthInPixels, heightInPixels })
    const mainCamera = this.cameras.main
    mainCamera.setRoundPixels(true)
    mainCamera.setBounds(0, 0, widthInPixels, heightInPixels)
    mainCamera.startFollow(player, true, 1, 1)
  }
}
