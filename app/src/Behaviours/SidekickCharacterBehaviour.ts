export const SidekickCharacterBehaviour = `
root {
    selector {
        sequence while(CanSeePlayerCondition) {
            action [EmoteLoveAction]
            repeat while(CanSeePlayerCondition) {
                wait [200]
            }
        }

        sequence until(CanSeePlayerCondition) {
            action [EmoteQueryAction]
            repeat until(CanSeePlayerCondition) {
                action [MoveTowardsPlayerAction]
            }
        }
    }
}
`
