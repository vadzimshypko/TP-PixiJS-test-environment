import {Sprite} from "pixi.js";

export class SlotState {

    private _sprite: Sprite;
    private _x: number;
    private _y: number;

    constructor(sprite: Sprite, x: number, y: number) {
        this._sprite = sprite;
        this._x = x;
        this._y = y;
    }

    get sprite(): Sprite {
        return this._sprite;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}
