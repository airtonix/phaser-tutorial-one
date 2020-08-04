import { Guid } from 'guid-typescript'
import { types, Instance, SnapshotIn, SnapshotOut, ReferenceIdentifier } from 'mobx-state-tree'
import { ReferenceT } from 'mobx-state-tree/dist/internal'

import { BaseModel } from '~/Store/BaseModel'
import { CharacterMST, ICharacterSnapshotIn } from '~/Store/Character/Character.model'


const generatedID = Guid.create().toString()

export const PlayerMST = types.model('Player', {
  id: types.optional(types.identifier, generatedID),
  characters: types.optional(types.array(CharacterMST), []),
  activeCharacter: types.maybeNull(types.reference(CharacterMST))
})

export interface IPlayer extends Instance<typeof PlayerMST> {}
export interface IPlayerSnapshotIn extends SnapshotIn<typeof PlayerMST> {}
export interface IPlayerSnapshotOut extends SnapshotOut<typeof PlayerMST> {}
export interface IPlayerReference extends ReferenceT<typeof PlayerMST> {}

export class PlayerModel extends BaseModel implements IPlayerSnapshotIn {
  characters: ICharacterSnapshotIn[]
  activeCharacter: ReferenceIdentifier
}