import { Dialog } from "./Dialog";
import { DialogLootItem } from './DialogLootItem'
import { Frame } from 'phaser-ui-tools'

export class LootDialog extends Dialog {

    renderContent (content) {
        super.renderContent(content)
        this.setWidth(16)
        this.setHeight(16)

        this.content = content.reduce((result, item, index) => {
            const previouItem = result[result.length -1]
            const y = previouItem
                ? previouItem.y + previouItem.height + 4
                : 4
            const lootItem = new DialogLootItem(
                this.scene,
                4, y,
                item
            )
            const { width, height } = lootItem
            const totalHeight = item && y + height
            const totalWidth = item && this.width < width
                ? width
                : this.width

            this.setWidth(totalWidth + 8)
            this.setHeight(totalHeight + 8)

            return [
                ...result,
                lootItem
            ]
        }, [])
        this.add(this.content)

    }

}