import {
  prop,
  model,
  Ref,
  ExtendedModel,
  modelAction,
  findParent,
} from 'mobx-keystone'

import { Zone } from '~/Store/Zone/ZoneModel'
import { ZoneReference } from '~/Store/Zone/ZoneReference'
import { Game } from '~/Store/Game/GameModel'
import { PortalWorldEntity } from '~/Objects/PortalWorldEntity'

import { PortalReference } from './PortalEntityReference'
import { WorldEntityModel } from './EntityModel'

export const PORTALENTITY_MODEL_KEY = 'PortalEntity'
export type PortalModelInstanceType = InstanceType<typeof PortalModel>

@model(PORTALENTITY_MODEL_KEY)
export class PortalModel extends ExtendedModel(WorldEntityModel, {
  zone: prop<Ref<Zone>>(),

  /**
   * Name of the portal this portal sends the player to
   */
  toPortal: prop<string | undefined>(),

  /**
   * Name of the zone this portal sends the player to
   */
  toZone: prop<string | undefined>(),

  /**
   * Which portal does this portal link to?
   */
  linksTo: prop<Ref<PortalModel> | undefined>()
}) {

  static type = 'Portal'

  static GameObjectClass = PortalWorldEntity

  @modelAction
  setZone (zone: Zone): void {
    this.zone = ZoneReference(zone)
  }

  @modelAction
  setLinksTo (portal: PortalModel): void {
    const reference = PortalReference(portal)
    this.linksTo = reference
  }

  get fromZone (): Zone | undefined {
    return this.zone && this.zone.current
      ? this.zone.current
      : undefined
  }

  getRootStore (): Game | undefined {
    return findParent<Game>(this, parentNode => parentNode instanceof Game)
  }

  getTargetZone (): Zone | undefined {
    const gameStore = this.getRootStore()
    if (!gameStore) return

    const zone = gameStore.zones
      .find(zone => zone.name == this.toZone)

    return zone
  }

  getTargetPortal (): PortalModel | undefined {
    const zone = this.getTargetZone()
    if (!zone) return

    const portal = zone.portals.find(portal =>
      portal.name == this.toPortal
    )
    return portal
  }
  /**
   * Return a reference of the portal that this portal linkes to
   *
   * @return  {PortalModel}  Portal Model
   */
  get target (): PortalModel | undefined {
    const linksTo = this.linksTo
    if (!linksTo || !linksTo.isValid) {
      const portal = this.getTargetPortal()
      if (!portal) return

      this.setLinksTo(portal)
      return portal
    }

    return linksTo.current
  }

  createGameObject (scene: Phaser.Scene): PortalWorldEntity {
    const gameobject = new PortalWorldEntity(
      scene,
      this.x, this.y, this.width, this.height
    )
    gameobject.setDepth(this.depth)
    gameobject.model = this
    return gameobject
  }

}
