import { Character } from '../Character';

import { TypeofOrientation } from '~/Config/constants';
import { NotImplementedError } from '~/Core/exceptions';


export class BaseController {
  /**
   * Creates an input controller
   *
   * - controls a character
   * - from input, will declare a direction
   */
  constructor (
    private scene: Phaser.Scene,
    private character: Character,
    private orientation: TypeofOrientation
  ) {
    this.input = this.createInput()
  }

  createInput () {
    throw new NotImplementedError()
  }
}
