export const LootChestBehaviour = `
root {
    selector {

        repeat until(isPlayerTouchingMe) {
            sequence {
                action [hideEmote]
                action [forgetAboutPlayer]
                wait [1000, 2500]
            }
        }

        sequence while(isPlayerTouchingMe)  {
            lotto [10,5,3,1] while(hasNotYetGreetedPlayer) {
                action [showHelpfulEmote]
                action [showExclamationEmote]
                action [showClosedEmote]
                action [showStarEmote]
            }
            wait [2500]
            action [hideEmote]
        }
    }
}`
