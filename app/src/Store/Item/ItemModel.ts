import {
    prop,
    model,
    ExtendedModel,
} from 'mobx-keystone'

import { Entity } from '../Entity/EntityModel';

export const ITEM_MODEL_KEY = 'Item'

@model(ITEM_MODEL_KEY)
export class Item extends ExtendedModel(Entity, {
    value: prop<number>(),
    icon: prop<string>(),
    durability: prop<number>(100),
}){

}