import * as PIXI from "pixi.js";
import {Sprite, Texture} from "pixi.js";
import {SlotManager} from "./slotManager";
import {Field} from "./field";
import {SpinButton} from "./spinButton";

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
        loader.add("btn_spin_disabled", "images/ui/btn_spin_disabled.png");
        loader.add("btn_spin_hover", "images/ui/btn_spin_hover.png");
        loader.add("btn_spin_normal", "images/ui/btn_spin_normal.png");
        loader.add("btn_spin_pressed", "images/ui/btn_spin_pressed.png");
        loader.load(() => {
            this.load(slotManager);
        });
    }

    private load(slotManager: SlotManager): void {
        slotManager.fillSprites(PIXI.utils.TextureCache);
        const field = this.loadField(slotManager);
        this.loadSpinButton(field.startAnimate);
    }

    private loadField(slotManager: SlotManager): Field {
        const container = new PIXI.Container();
        container.height = this.ROW * this.SLOT_EDGE_SIZE;
        container.width = this.COLUMNS * this.SLOT_EDGE_SIZE;
        container.x = 200;
        container.y = 200;
        this.app.stage.addChild(container);
        return new Field(container, this.SLOT_EDGE_SIZE, this.ROW, this.COLUMNS, slotManager);
    }

    private loadSpinButton(startAnimate: Function) {
        const textures: Texture[] = [];
        textures.push(PIXI.utils.TextureCache["btn_spin_disabled"]);
        textures.push(PIXI.utils.TextureCache["btn_spin_hover"]);
        textures.push(PIXI.utils.TextureCache["btn_spin_normal"]);
        textures.push(PIXI.utils.TextureCache["btn_spin_pressed"]);
        const sprite: Sprite = new PIXI.Sprite(textures[2]);
        this.app.stage.addChild(sprite);
        const spinButton: SpinButton = new SpinButton(sprite, textures, startAnimate);
    }
}
