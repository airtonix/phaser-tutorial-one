import { WritesLogs } from './WritesLogs';

import { Constructor } from '~/Core/framework';

export function IsPlaceable<TBase extends Constructor> (Base: TBase) {
    return class IsPlaceable extends WritesLogs(Base) {
        x: integer
        y: integer
        setPosition: (x: integer, y: integer) => void
        setDepth: (depth: integer) => void

        place ({
            x, y, depth
        }): void {
            this.setPosition(x, y)

            if (depth) {
                this.setDepth(depth)
            }
        }
    }
}