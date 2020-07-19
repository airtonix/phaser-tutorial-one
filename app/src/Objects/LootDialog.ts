import { Dialog } from "./Dialog";
import { DialogLootItem } from './DialogLootItem'
import { Frame } from 'phaser-ui-tools'

export class LootDialog extends Dialog {
    renderContent (content) {
        super.renderContent(content)
        this.add(content.map(item =>
            new DialogLootItem(this.scene, 0, 0, item)
        ))
    }

    close () {
        this.removeAll(true)
    }
}