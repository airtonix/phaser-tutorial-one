import { CanAnimate } from '~/Mixins/CanAnimate';
import { CanEmote } from '~/Mixins/CanEmote';
import { ShouldDisplay } from '~/Mixins/ShouldDisplay';

@CanAnimate
@CanEmote
@ShouldDisplay
export class Character extends Phaser.GameObjects.Container {

}