console.log("Hello, World!")
import * as PIXI from "pixi.js"

let app = new PIXI.Application();

window.onload = () => {
    document.body.appendChild(app.view);
};

let loader = new PIXI.Loader();
loader.add("symbol_1", "images/symbols/symbol_1.png");

loader.load(() => {
    let sprite = new PIXI.Sprite();
    sprite.texture = PIXI.utils.TextureCache["symbol_1"];
    app.stage.addChild(sprite);
});
