import { Guid } from 'guid-typescript'
import { types, Instance, SnapshotIn, SnapshotOut, IMSTArray } from 'mobx-state-tree'

import BaseModel from '~/Store/BaseModel'
import { CharacterMST, ICharacter, CharacterModel } from '~/Store/Character/Character.model'


const generatedID = Guid.create().toString()

export const PlayerMST = types.model('Player', {
  id: types.optional(types.identifier, generatedID),
  characters: types.array(CharacterMST),
  activeCharacter: types.maybeNull(types.reference(CharacterMST))
})

export interface IPlayer extends Instance<typeof PlayerMST> {}
export interface IPlayerSnapshotIn extends SnapshotIn<typeof PlayerMST> {}
export interface IPlayerSnapshotOut extends SnapshotOut<typeof PlayerMST> {}

export class PlayerModel extends BaseModel implements IPlayerSnapshotIn {
  id: string
  characters: ICharacter[]
  activeCharacter?: string

  constructor (
    id: string = Guid.create().toString(),
    characters: ICharacter[] = [],
    activeCharacter?: string
  ) {
    super()
    this.id = id
    this.characters = characters
    this.activeCharacter = activeCharacter
  }
}