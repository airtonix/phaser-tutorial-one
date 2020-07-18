import { Constructor } from "~/Base";
import { WritesLogs } from "./WritesLogs";
import { Emotes } from "~/constants";

export function CanInteract<TBase extends Constructor>(Base: TBase) {
    return class CanInteract extends WritesLogs(Base) {

        constructor (...args: any[]) {
            super(...args)
            this.log('CanInteract')
        }

        use () {
            this.emit('show-emote', Emotes.Default.frames.Blank, 1500)
        }

    }
}