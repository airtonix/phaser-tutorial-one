
import ScrollablePanel from 'phaser3-rex-plugins/templates/ui/scrollablepanel/ScrollablePanel'
import RoundRectangle from 'phaser3-rex-plugins/templates/ui/roundrectangle/RoundRectangle'
import Sizer from 'phaser3-rex-plugins/templates/ui/sizer/Sizer'
import { WritesLogs } from '~/Mixins/WritesLogs';

export const COLOR_PRIMARY = 0x4e342e;
export const COLOR_LIGHT = 0x7b5e57;
export const COLOR_DARK = 0x260e04;

interface IDialogOptions {
    columns: number
    rows: number
}

@WritesLogs
export class Dialog {
    public scene: Phaser.Scene
    public config: IDialogOptions
    public background: RoundRectangle
    public ui: ScrollablePanel

    constructor (scene: Phaser.Scene, config: IDialogOptions) {
        this.key = config.key
        this.config = config
        this.scene = scene
        const background = new RoundRectangle(scene, 0, 0, 2, 2, 4, COLOR_PRIMARY)
        const panel = new Sizer(scene, {
            orientation: 'x',
            space: { item: 10 },
        })
        const track = new RoundRectangle(scene, 0, 0, 8, 8, 3, COLOR_DARK)
        const thumb = new RoundRectangle(scene, 0, 0, 0, 0, 2, COLOR_LIGHT)

        this.scene.add.existing(background)
        this.scene.add.existing(panel)
        this.scene.add.existing(track)
        this.scene.add.existing(thumb)

        this.ui = new ScrollablePanel(scene, {
            ...config,
            scrollMode: 0,
            background,
            panel: {
                child: panel,
                mask: {
                    padding: 1,
                },
            },
            slider: {
                track,
                thumb,
            },
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                panel: 10,
            },
        })
        .layout()

        this.ui.setVisible(false)
    }

    get body () {
        return this.ui.getElement('panel')
    }

    public open = (...args: any[]): void => {
        this.log(`open`, this.table, ...args)
    }

    public close = (...args: any[]): void => {
        this.log(`close`, this.table, ...args)
    }

    public toggle = (...args: any[]): void => {
        this.log(`toggle`, this.table, ...args)
    }
}
