import { AbstractActor } from  '~/core/Actor'

export class Player extends AbstractActor {
    public static REGISTRY_KEYS = {
        HP: 'playerHp',
    }
}