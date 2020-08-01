import { UiDialog } from './UiDialog';
import { InventoryItemUi, InventoryItemModel } from './InventoryItemUi'

export interface IUiDialogInventoryOptions {
    cells: integer,
    rows: integer
}

export class UiDialogInventory extends UiDialog {
    slotWidth = 32
    slotHeight = 32
    slotMargin = 2
    uiMargin = 4
    minimumCells = 1
    options: IUiDialogInventoryOptions

    renderContent (content: InventoryItemModel[]):void {
        super.renderContent(content)
        this.setWidth(this.slotWidth)
        this.setHeight(this.slotHeight)

        const {
            cells,
            rows
        } = this.options

        this.minimumCells = cells * rows

        this.content = this.collateItems(content)
            .map((item, index) => {
                const x = ((index % cells) * (this.slotWidth + this.slotMargin)) + this.uiMargin
                const y = (Math.floor(index / cells) * (this.slotWidth + this.slotMargin)) + this.uiMargin
                return new InventoryItemUi(
                    this.scene,
                    {
                        x, y,
                        w: this.slotWidth,
                        h: this.slotHeight
                    },
                    item
                )
            })
        this.add(this.content)
        this.setWidth((this.slotWidth * cells) + ((this.slotMargin + this.uiMargin) * 2))
        this.setHeight((this.slotHeight * rows) + ((this.slotMargin + this.uiMargin) * 2))
    }

    collateItems (content: InventoryItemModel[]): InventoryItemModel[] {
        return content.reduce((result: InventoryItemModel[], item: InventoryItemModel) => {
            const existing = result
                .find((lootItem: InventoryItemModel) => {
                    return item.id === lootItem.id
                })
            if (existing) {
                existing.count += 1
                return result
            }
            return [
                ...result,
                { ...item, count: 1 }
            ]
        }, [])
    }

}