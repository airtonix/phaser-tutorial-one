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
                sequence {
                    wait [200, 500]
                    lotto {
                        action [WalkLeftAction]
                        action [WalkRightAction]
                        action [WalkDownAction]
                        action [WalkUpAction]
                    }
                    wait [4000, 8500]
                    action [IdleAction]
                    wait [10000, 18500]
                }
            }
        }
    }
}
`
