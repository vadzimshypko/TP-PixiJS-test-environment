import * as PIXI from "pixi.js";
import {SlotManager} from "./slotManager";
import {Field} from "./field";

export class Application {
    private app: PIXI.Application;

    private SLOT_EDGE_SIZE = 200;
    private ROW = 3;
    private COLUMNS = 5;

    constructor() {
        this.app = new PIXI.Application({
            width: 1400,
            height: 1000,
            antialias: true,
            transparent: false,
            resolution: 1
        });
        this.app.renderer.backgroundColor = 0x061639;
    }

    public Start(): void {
        window.onload = () => document.body.appendChild(this.app.view);

        const loader = new PIXI.Loader();
        const slotManager = new SlotManager();
        for (const item of slotManager.getSlots()) {
            loader.add(item.name, item.path);
        }
        loader.load(() => {
            slotManager.fillSprites(PIXI.utils.TextureCache);
            const container = new PIXI.Container();
            container.height = this.ROW * this.SLOT_EDGE_SIZE;
            container.width = this.COLUMNS * this.SLOT_EDGE_SIZE;
            container.x = 200;
            container.y = 200;
            this.app.stage.addChild(container);
            const field = new Field(container, this.SLOT_EDGE_SIZE, this.ROW, this.COLUMNS, slotManager);
        });
    }
}
