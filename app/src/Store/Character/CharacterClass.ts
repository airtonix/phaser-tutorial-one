import {
  prop,
  model,
  Model,
} from 'mobx-keystone'

import * as Characters from '~/Objects/Characters'

export const CHARACTERCLASS_MODEL_KEY = 'CharacterClass'

@model(CHARACTERCLASS_MODEL_KEY)
export class CharacterClass extends Model({
  name: prop<string>()
}) {
    static classes = Object.keys(Characters)
}