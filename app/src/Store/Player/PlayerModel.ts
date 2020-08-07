import {
    prop,
    detach,
    rootRef,
    model,
    Model,
    Ref,
} from 'mobx-keystone'

import { Character } from '~/Store/Character/CharacterModel'

export const PLAYER_MODEL_KEY = 'Player'

@model(PLAYER_MODEL_KEY)
export class Player extends Model({
    characters: prop<Character[]>(() => []),
    activeCharacter: prop<Ref<Character> | undefined>(),
}) {
    onAttachedToRootStore (): void {
        this.characters = [
            new Character({
                name: 'Test',
                type: 'Warrior',
                hp: 100,
                icon: ''
            })
        ]
    }
}

export const PlayerRef = rootRef<Player>(PLAYER_MODEL_KEY, {
    onResolvedValueChange (ref, newPlayer, oldPlayer) {
        if (oldPlayer && !newPlayer) {
            detach(ref)
        }
    }
})