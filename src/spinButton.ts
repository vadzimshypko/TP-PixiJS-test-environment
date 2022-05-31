import {Sprite, Texture} from "pixi.js";

enum Stage {
    disabled = 0,
    hover = 1,
    normal = 2,
    pressed = 3
}

export class SpinButton {
    private button: Sprite;
    private textures: Texture[];
    private startAnimate: Function;
    private _stage: Stage = 2;

    constructor(sprite: Sprite, textures: Texture[], startAnimate: Function) {
        this.button = sprite;
        this.textures = textures;
        this.startAnimate = startAnimate;

        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button
            .on('pointerdown', this.onButtonDown)
            .on('pointerup', this.onButtonUp)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut);
    }

    set stage(value: Stage) {
        this.button.texture = this.textures[value];
        this._stage = value;
        console.log(this._stage);
    }

    private onButtonOut() {
        switch (this._stage) {
            case Stage.normal:
                this._stage = Stage.hover;
                break;
        }
    }

    private onButtonOver() {
        switch (this._stage) {
            case Stage.hover:
                this._stage = Stage.normal;
                break;
        }
    }

    private onButtonUp() {
        switch (this._stage) {
            case Stage.hover:
            case Stage.pressed:
            case Stage.normal:
                this._stage = Stage.disabled;
                break;
        }
    }

    private onButtonDown() {
        switch (this._stage) {
            case Stage.hover:
            case Stage.normal:
                this._stage = Stage.pressed;
                break;
        }
    }
}
