import Phaser from 'phaser'
import PhaserNavMeshPlugin from 'phaser-navmesh'

export const PARENT_DIV_TAG = 'phaser-game'

export default {

  title: 'Maintainable Game',

  type: Phaser.AUTO,
  backgroundColor: '#000',

  parent: PARENT_DIV_TAG,

  width: window.innerWidth / 2,
  height: window.innerHeight / 2,

  plugins: {
    scene: [
      {
        key: 'NavMeshPlugin',
        plugin: PhaserNavMeshPlugin,
        mapping: 'navMeshPlugin',
        start: true
      }
    ]
  },

  render: {
    // prevent tile bleeding
    antialiasGL: false,
    // prevent pixel art from becoming blurry when scaled
    pixelArt: true,
  },

  scale: {
    zoom: Phaser.Scale.ZOOM_2X
  },

  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      gravity: { y: 0 }
    }
  },
}
