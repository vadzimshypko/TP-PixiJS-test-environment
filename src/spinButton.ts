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
    private _stage: Stage = Stage.normal;

    private cursorIsUnder : boolean = false;

    constructor(sprite: Sprite, textures: Texture[], startAnimate: Function) {
        this.button = sprite;
        this.textures = textures;
        this.startAnimate = startAnimate;
        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button
            .on('pointerdown', () => this.onButtonDown())
            .on('pointerup', () => this.onButtonUp())
            //.on('pointerupoutside', () => this.onButtonUp())
            .on('pointerover', () => this.onButtonOver())
            .on('pointerout', () => this.onButtonOut());
    }

    private onButtonOut() {
        this.cursorIsUnder = false;
        switch (this.stage) {
            case Stage.hover:
            case Stage.pressed:
                this.stage = Stage.normal;
                break;
        }
    }

    private onButtonOver() {
        this.cursorIsUnder = true;
        switch (this.stage) {
            case Stage.normal:
                this.stage = Stage.hover;
                break;
        }
    }

    private onButtonUp() {
        switch (this.stage) {
            case Stage.pressed:
                if (this.cursorIsUnder) {
                    this.stage = Stage.disabled;
                    this.startAnimate(() => {
                        this.stage = this.cursorIsUnder ? Stage.hover : Stage.normal;
                    });
                } else {
                  this.stage = Stage.normal;
                }
                break;
        }
    }

    private onButtonDown() {
        switch (this.stage) {
            case Stage.hover:
                this.stage = Stage.pressed;
                break;
        }
    }

    private set stage(value: Stage) {
        this.button.texture = this.textures[value];
        this._stage = value;
        console.log("new stage: " + this._stage.toString());
    }
    private get stage() : Stage {
        return this._stage;
    }
}
