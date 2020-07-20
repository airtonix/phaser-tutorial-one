import { Dialog } from "./Dialog";
import { DialogLootItem } from './DialogLootItem'
import { Frame } from 'phaser-ui-tools'

export class LootDialog extends Dialog {
    renderContent (content) {
        super.renderContent(content)
        this.content = content.map((item, index) =>
            new DialogLootItem(
                this.scene,
                this.x + 4,
                this.y + 4,
                item
            )
        )
        this.add(this.content)
    }
}