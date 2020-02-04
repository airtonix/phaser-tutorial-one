import Phaser from "phaser"
import Dungeon from "@mikewesthad/dungeon"

import Player from "~/Objects/Player"
import { BaseScene } from "./BaseScene"
import { TILE_MAPPING } from "./GameSceneConstants"


export class GameScene extends BaseScene {

    constructor() {
        super({ key: "Game" })
    }

    preload() {


    }

    create() {

        this.dungeon = new Dungeon({
            width: 50,
            height: 50,
            doorPadding: 2,
            rooms: {
                width: { min: 7, max: 15, onlyOdd: true },
                height: { min: 7, max: 15, onlyOdd: true }
            }
        })

        // Create a blank map
        const map = this.make.tilemap({
            tileWidth: 48,
            tileHeight: 48,
            width: this.dungeon.width,
            height: this.dungeon.height
        })

        const tileset = map.addTilesetImage(
            "tiles", null, 48, 48, 1, 2)

        this.groundLayer = map.createBlankDynamicLayer(
            "Ground", tileset)
        this.stuffLayer = map.createBlankDynamicLayer(
            "Stuff", tileset)

        this.groundLayer.fill(TILE_MAPPING.BLANK)

        this.rooms = this.dungeon.rooms
        this.startRoom = this.rooms[0]
        this.endRoom = this.rooms[this.rooms.length - 1]

        this.otherRooms = Phaser.Utils.Array
            .Shuffle(this.rooms)
            .slice(0, this.rooms.length * 0.9)

        this.rooms.forEach(this.generateRoom)
        this.generateStartRoomStuff(this.startRoom)
        this.generateEndRoomStuff(this.endRoom)
        this.otherRooms.forEach(this.generateRoomStuff)


        this.groundLayer.setCollisionByExclusion(
            [-1, 6, 7, 8, 26, ]
        )


        this.stuffLayer.setCollisionByExclusion(
            [-1, TILE_MAPPING.TOWER]
        )

        this.player = new Player(
            this,
            map.widthInPixels / 2,
            map.heightInPixels / 2)

        // Watch the player and layer for collisions,
        // for the duration of the scene:
        this.physics.add.collider(
            this.player,
            this.groundLayer)

        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main
        camera.startFollow(this.player)
        camera.setBounds(0, 0,
            map.widthInPixels,
            map.heightInPixels)

        // Help text that has a "fixed" position on the screen
        this.add
            .text(16, 16, "Arrow keys to move", {
                font: "18px monospace",
                fill: "#000000",
                padding: { x: 20, y: 10 },
                backgroundColor: "#ffffff"
            })
            .setScrollFactor(0)
    }

  generateRoom = (room) => {
      const {
          x, y,
          width, height,
          left, right, top, bottom,
      } = room
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
      var doors = room.getDoorLocations() // → Returns an array of {x, y} objects
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

  generateEndRoomStuff = (room) => {
      this.stuffLayer.putTileAt(
          TILE_MAPPING.STAIRS,
          room.centerX,
          room.centerY)
  }

  generateStartRoomStuff = () => { }

  generateRoomStuff = (room) => {
      const rand = Math.random()
      if (rand <= 0.25) {
      // 25% chance of chest
          this.stuffLayer.putTileAt(
              TILE_MAPPING.CHEST,
              room.centerX,
              room.centerY)

      } else if (rand <= 0.5) {
      // 50% chance of a pot anywhere in the room
      //  except don't block a door!
          const x = Phaser.Math.Between(
              room.left + 2,
              room.right - 2)
          const y = Phaser.Math.Between(
              room.top + 2,
              room.bottom - 2)
          this.stuffLayer.weightedRandomize(
              x, y, 1, 1,
              TILE_MAPPING.POT)
      } else {
      // 25% of either 2 or 4 towers,
      // depending on the room size
          if (room.height >= 9) {
              this.stuffLayer.putTilesAt(
                  TILE_MAPPING.TOWER,
                  room.centerX - 1,
                  room.centerY + 1)
              this.stuffLayer.putTilesAt(
                  TILE_MAPPING.TOWER,
                  room.centerX + 1,
                  room.centerY + 1)
              this.stuffLayer.putTilesAt(
                  TILE_MAPPING.TOWER,
                  room.centerX - 1,
                  room.centerY - 2)
              this.stuffLayer.putTilesAt(
                  TILE_MAPPING.TOWER,
                  room.centerX + 1,
                  room.centerY - 2)
          } else {
              this.stuffLayer.putTilesAt(
                  TILE_MAPPING.TOWER,
                  room.centerX - 1,
                  room.centerY - 1)
              this.stuffLayer.putTilesAt(
                  TILE_MAPPING.TOWER,
                  room.centerX + 1,
                  room.centerY - 1)
          }
      }
  }

  update() {
      this.player.update()
  }

}
