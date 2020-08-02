import { PlayerMST } from './Player.model';
import { getPlayerActions } from './Player.actions';

export const PlayerStore = PlayerMST
    .actions(getPlayerActions)
