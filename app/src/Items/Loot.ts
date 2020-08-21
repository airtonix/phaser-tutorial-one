import Lootr from 'lootr'

export const Loot = new Lootr('/loot')

window.Loot = Loot

export interface ILootItem {
    from: string
    luck: number
    depth?: number
    stack: number | string
}

export interface ILootTable extends Array<ILootItem>{}