import { Constructor } from "~/Base";

export function CanInteract<TBase extends Constructor>(Base: TBase) {
    return class CanInteract extends Base {

        constructor (...args: any[]) {
            super(...args)
        }

        use () {}
    }
}