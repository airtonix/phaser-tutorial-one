import { Dialog, COLOR_LIGHT } from './Dialog'
import GridSizer from  'phaser3-rex-plugins/templates/ui/gridsizer/GridSizer'
import Label from 'phaser3-rex-plugins/templates/ui/label/Label'
import RoundRectangle from 'phaser3-rex-plugins/templates/ui/roundrectangle/RoundRectangle'

export enum DIRECTION {
    DIRECTION_HORIZONTAL = 'horizontal',
    DIRECTION_VERTICAL = 'vertical'
}
export interface IGridConfiguration {
    row: number,
    column: number
}

export class ContainerDialog extends Dialog {
    public static DIRECTIONS = DIRECTION

    public key: string
    public grid: GridSizer
    public lanes: number
    public direction: DIRECTION
    public itemWidth: number
    public itemHeight: number

    constructor (...args: any[]) {
        super(...args)
        const {
            lanes,
            direction
        } = this.config
        this.lanes = lanes ||  8
        this.direction = direction || DIRECTION.DIRECTION_VERTICAL

        this.grid = new GridSizer(this.scene, {
            column: 1,
            row: 1,
            rowProportions: 1,
            space: { column: 10, row: 10 },
            name: this.key  // Search this name to get table back
        })

        this.body.add(this.grid)

        if (this.config.items) {
            this.setItems(this.config.items)
            this.renderContent()
        }
    }

    public open = (): void => {
        this.renderContent()
        this.ui.setVisible(true)
    }

    public close = (): void => {
        this.grid.removeAll()
        this.ui.setVisible(false)
    }

    public toggle = () => {
        if (this.ui.visible) {
            this.close()
        } else {
            this.open()
        }
    }

    public setItems (items: any[]): void {
        this.items = this.collateItems(items)
    }

    public calculateSize (count: number): IGridConfiguration {
        return {
            row: this.direction === DIRECTION.DIRECTION_HORIZONTAL
                ? this.lanes
                : Math.ceil(count / this.lanes),
            column: this.direction === DIRECTION.DIRECTION_VERTICAL
                ? this.lanes
                : Math.ceil(count / this.lanes)
        }
    }

    private collateItems (items) {
        return items.reduce((result, item) => {
            const { id } = item
            const existing = result.find(item =>  item.id === id)
            if (existing) {
                existing.count = existing.count + 1
                return result
            }

            return [
                ...result,
                {
                    ...item,
                    count: 1
                }
            ]
        }, [])
    }

    private renderContent (): void {
        const items = this.items
        if (!items || !items.length) return

        const { column, row } = this.calculateSize(items.length)
        this.grid.clear(true)
        this.grid.resetGrid(column, row)
        this.log(`resetGrid: column[${column}] row[${row}]}]`)
        items.forEach(item => {
                this.grid.add(this.renderItem(item))
            })
        this.grid.layout()
        this.ui.layout()
        this.log(`items: ${this.grid.getElement('items').length}`)
    }

    private renderItem (item): Label {
        this.log(`renderItem <${item.id}> ${item.name}[${item.count}]`)
        return new Label(this.scene, {
            orientation: this.direction === DIRECTION.DIRECTION_HORIZONTAL
                ? 'y'
                : 'x',
            icon: new RoundRectangle(this.scene, 0, 0, this.itemWidth, this.itemHeight, 5, COLOR_LIGHT),
            text: new Phaser.GameObjects.Text(this.scene, 0, 0, item.count, {}),
            space: { icon: 3 }
        })
    }
}
