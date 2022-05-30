import {Slot} from "./slot";
import * as PIXI from "pixi.js";
import {Sprite, Texture} from "pixi.js";

export class SlotManager {
    private NUMBER_OF_SPRITES = 8;
    private slots: Slot[];

    constructor() {
        this.slots = [];
        for (let i: number = 1; i <= this.NUMBER_OF_SPRITES; i++) {
            this.slots.push(new Slot(`images/symbols/symbol_${i}.png`));
        }
    }

    public getRandomSprite(): Sprite {
        return new PIXI.Sprite(this.slots[Math.floor(Math.random() * this.NUMBER_OF_SPRITES)].sprite?.texture);
    }

    public getSlots() : Slot[] {
        return this.slots;
    }

    fillSprites(TextureCache: { [p: string]: Texture }) {
        for (const item of this.slots) {
            let sprite = new PIXI.Sprite();
            sprite.texture = PIXI.utils.TextureCache[item.name];
            item.sprite = sprite;
        }
    }
}
