import {
  prop,
  model,
  Model,
} from 'mobx-keystone'

export const MODIFIER_MODEL_KEY = 'Modifier'

@model(MODIFIER_MODEL_KEY)
export class Modifier extends Model({
  /**
     * TODO: point at a ModifierTypeModel
     */
  type: prop<string>(),

  /**
     * @name Modifier Name
     */
  name: prop<string>(),

  /**
     *  TODO: point at EffectTypeModel
     */
  effect: prop<number>(),

  /**
     * Icon to show for the Modifier
     */
  icon: prop<string>(),

  /**
     * Which attribute will this effect on the entity
     */
  attribute: prop<string>(),

  /**
     * When affecting the entity, how much is it affected?
     * TODO: replace this with some kind of equation notation.
     */
  value: prop<number>(),
}){

}
