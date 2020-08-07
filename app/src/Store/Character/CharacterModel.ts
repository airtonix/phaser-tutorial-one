import {
    prop,
    model,
    ExtendedModel,
} from 'mobx-keystone'

import { Entity } from '../Entity/EntityModel';

export const CHARACTER_MODEL_KEY = 'Character'

@model(CHARACTER_MODEL_KEY)
export class Character extends ExtendedModel(Entity, {
    icon: prop<string>(),
    hp: prop<number>(),
}){
}