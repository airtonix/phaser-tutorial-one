import Phaser from 'phaser'

import { AbstractBaseScene } from '~/core/BaseScene';
import { Logger } from '~/core/Logger'
import { Player } from '~/Objects/Player';

const log = Logger(module.id)

export abstract class AbstractMapScene extends AbstractBaseScene {
    public player: Player;
    public cursors: CursorKeys;
    public npcs: Npc[];
    public monsters: Monster[];
    public map: Phaser.Tilemaps.Tilemap;
}

