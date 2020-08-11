import {
  prop,
  model,
  Model,
} from 'mobx-keystone'

import { Modifier } from '../Modifier/ModifierModel';

export const ENTITY_MODEL_KEY = 'Entity'

@model(ENTITY_MODEL_KEY)
export class Entity extends Model({
  type: prop<string>(),
  name: prop<string>(),
  modifiers: prop<Modifier[]>(() => []),
  durability: prop<number>(100),
}){
}

