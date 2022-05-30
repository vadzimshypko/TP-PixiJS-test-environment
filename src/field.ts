import {Container, Sprite} from "pixi.js";
import {SlotState} from "./slotState";
import {SlotManager} from "./slotManager";

export class Field {
    private container!: Container;

    private row: number;
    private columns: number;

    // slot edge size;
    private size: number;

    private slots: SlotState[][] | null = null;

    private slotManager: SlotManager;

    public constructor(container: Container, size: number, row: number, columns: number, slotManager: SlotManager) {
        this.row = row;
        this.columns = columns;
        this.slotManager = slotManager;
        this.size = size;
        this.container = container;
        this.InitSlots();
    }

    private InitSlots() {
        this.slots = [];
        console.log(`size = ${this.size}`);
        for (let i = 0; i < this.row; i++) {
            this.slots.push([]);
            for (let j = 0; j < this.columns; j++) {
                var temp = this.slotManager.getRandomSprite();

                this.slots[i].push(new SlotState(temp, i, j));
                temp.width = this.size;
                temp.height = this.size;
                temp.x = this.size * j;
                temp.y = this.size * i;

                this.container.addChild(temp);
            }
        }
    }
}
