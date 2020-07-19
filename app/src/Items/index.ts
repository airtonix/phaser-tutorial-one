import Lootr from 'lootr'

import './Enchantments'
import { Artifacts } from './Artifacts'
import { Weapons } from './Weapons'
import { Armour } from './Armour'
import { Jewellry } from './Jewels'
import { Currency } from './Currency'
import { Gems } from './Gems'

export const Loot = new Lootr('/loot')

const ArtifactBranch = Loot.branch('/loot/artifacts')
Artifacts.forEach(item => ArtifactBranch.add(item))

const WeaponBranch = Loot.branch('/loot/weapons')
Weapons.forEach(item => WeaponBranch.add(item))

const ArmourBranch = Loot.branch('/loot/armour')
Armour.forEach(item => ArmourBranch.add(item))

const JewellryBranch = Loot.branch('/loot/jewellry')
Jewellry.forEach(item => JewellryBranch.add(item))

const CurrencyBranch = Loot.branch('/loot/currency')
Currency.forEach(item => CurrencyBranch.add(item))

const GemBranch = Loot.branch('/loot/gems')
Gems.forEach(item => GemBranch.add(item))

window.Loot = Loot