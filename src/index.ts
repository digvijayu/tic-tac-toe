import {
	Application,
} from "pixi.js";

import GameScene from "./scenes/GameScene";

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	resizeTo: window
});

const scene = new GameScene();
app.stage.addChild(scene);
