import { PlayerMST } from './Player.model';
import { getPlayerActions } from './Player.actions';
import { getPlayerViews } from './Player.view';

export const PlayerStore = PlayerMST
    .actions(getPlayerActions)
    .views(getPlayerViews)
