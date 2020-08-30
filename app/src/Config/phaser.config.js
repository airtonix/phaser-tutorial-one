import Phaser from 'phaser'
import PhaserNavMeshPlugin from 'phaser-navmesh'
import { getPathFromLocation } from '~/Core/loader'

import { getPathFromLocation } from '~/Core/loader'

export const PARENT_DIV_TAG = 'phaser-game'

export default {

  title: 'Maintainable Game',

  type: Phaser.AUTO,
  backgroundColor: '#000',

  parent: PARENT_DIV_TAG,

  width: window.innerWidth,
  height: window.innerHeight,

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

  // scale: {
  //   zoom: Phaser.Scale.ZOOM_2X
  // },

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },

  loader: {
    baseURL: getPathFromLocation(window.location.pathname)
  }
}
