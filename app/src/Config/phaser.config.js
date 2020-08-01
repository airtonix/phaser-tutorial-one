import Phaser from 'phaser'
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'
export const PARENT_DIV_TAG = 'phaser-game'

export default {

  title: 'Maintainable Game',

  type: Phaser.AUTO,
  backgroundColor: '#000',

  parent: PARENT_DIV_TAG,

  width: window.innerWidth / 2,
  height: window.innerHeight / 2,

  render: {
    // prevent tile bleeding
    antialiasGL: false,
    // prevent pixel art from becoming blurry when scaled
    pixelArt: true,
  },

  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: Phaser.Scale.ZOOM_2X
  },

  plugins: {
    global: [
      NineSlicePlugin.DefaultCfg
    ],
  },

  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
}
