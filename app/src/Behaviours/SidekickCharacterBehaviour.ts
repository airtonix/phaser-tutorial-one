export const SidekickCharacterBehaviour = `root {
    selector {
        selector while(CanSeePlayerCondition) {
            sequence {
                condition [IsCloseToPlayerCondition]
                wait [500]
                action [CirclePlayerAction]
            }
            action [MoveTowardsPlayerAction]
        }

        sequence {
            condition [IsHungryCondition]
            condition [CanSeeFoodCondition]
            action [EatFoodAction]
        }

        lotto {
            action [ComplainAction]
            sequence {
                action [WanderAction]
                wait [200, 1000]
                action [IdelAction]
            }
            action [SleepAction]
        }
    }
}`
