import {Sprite} from "pixi.js";

const pathTool = require('path');

export class Slot {
    private _sprite: Sprite | null;
    private _path: string;
    private _name: string;

    public constructor(path: string) {
        this._path = path;
        this._name = pathTool.basename(path);
        this._sprite = null;
        console.log(path + " : " + this._name);
    }

    get sprite(): Sprite | null {
        return this._sprite;
    }

    set sprite(value: Sprite | null) {
        this._sprite = value;
    }

    get name(): string {
        return this._name;
    }

    get path(): string {
        return this._path;
    }
}
