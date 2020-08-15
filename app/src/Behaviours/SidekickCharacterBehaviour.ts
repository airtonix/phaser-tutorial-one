export const SidekickCharacterBehaviour = `root {
    selector {
        repeat until(isPlayerTouchingMe) {
            sequence {
               wait [1000, 2500]
            }
        }
    }
}`
