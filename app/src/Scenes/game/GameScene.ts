import { AbstractActor } from '~/core/Actor';
import { AbstractBaseScene } from '~/core/BaseScene'
import { Logger } from '~/core/Logger'
import { Player } from '~/Objects/Player';
import { GameInterfaceScene } from '~/Scenes/game/HudScene';

const log = Logger(module.id)

export class GameManagerScene extends AbstractBaseScene {
  public static key = 'GameManager'

  constructor () {
    log('construct')
    super({ key: GameManagerScene.key })
  }

  protected create (): void {
    log('create')
    this.scene.launch(GameInterfaceScene.key);
  }

  // public update (): void {
  //   log('update')
  // }

  public get playerHp(): number {
    return this.registry.get(Player.REGISTRY_KEYS.HP);
  }

  public set playerHp(newHp: number) {
    this.registry.set(Player.REGISTRY_KEYS.HP, newHp);
    this.events.emit(AbstractActor.EVENT_KEYS.UPDATE_HP);
  }

}
