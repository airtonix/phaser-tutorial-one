import { MoveMST } from './Move.model';
import { getMoveActions } from './Move.actions';

export const MoveStore = MoveMST
    .actions(getMoveActions)