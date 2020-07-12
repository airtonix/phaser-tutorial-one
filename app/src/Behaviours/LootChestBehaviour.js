export const LootChestBehaviour = `
root {
    selector {

        repeat until(isPlayerTouchingMe) {
            sequence {
                action [forgetAboutPlayer]
                wait [1000, 2500]
            }
        }

        sequence while(isPlayerTouchingMe)  {
            wait [2500]
            action [openChest]
        }
    }
}`
