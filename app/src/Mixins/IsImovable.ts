import { WritesLogs } from './WritesLogs';

import { Constructor } from '~/Core/framework';

export function IsImovable<TBase extends Constructor> (Base: TBase) {
    return class IsImovable extends WritesLogs(Base) {
        body: {
            immovable: boolean,
            moves: boolean
        }

        constructor (...args: any[]) {
            super(...args)
            this.log('IsImovable')

            this.body.immovable = true;
            this.body.moves = false;
        }
    }
}