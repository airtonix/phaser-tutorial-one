import { Constructor } from "~/Base";
import { WritesLogs } from "./WritesLogs";

export function CanInteract<TBase extends Constructor>(Base: TBase) {
    return class CanInteract extends WritesLogs(Base) {

        constructor (...args: any[]) {
            super(...args)
            console.log('CanInteract')
        }

        use () {}

    }
}