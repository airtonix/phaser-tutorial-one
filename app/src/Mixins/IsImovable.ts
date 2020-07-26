import { Constructor } from "~Core/framework";
import { WritesLogs } from "./WritesLogs";

export function IsImovable<TBase extends Constructor>(Base: TBase) {
    return class IsImovable extends WritesLogs(Base) {
        constructor (...args: any[]) {
            super(...args)
            this.log('IsImovable')
            this.body.immovable = true;
            this.body.moves = false;
        }
    }
}