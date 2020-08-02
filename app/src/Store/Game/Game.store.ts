import { GameMST } from './Game.model';
import { getGameActions } from './Game.actions';

export const GameStore = GameMST
    .actions(getGameActions)