import {
    prop,
    model,
    ExtendedModel,
} from 'mobx-keystone'

import { Entity } from '~/Store/Entity/EntityModel'

export const ZONE_MODEL_KEY = 'Zone'

@model(ZONE_MODEL_KEY)
export class Zone extends ExtendedModel(Entity, {
    name: prop<string>(),
}) {
    static Types = {
        Dungeon: 'dungeon',
        Town: 'town',
        Shop: 'shop',
        World: 'world',
    }
}