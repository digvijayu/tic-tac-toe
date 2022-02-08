import {
	Application,
} from "pixi.js";

import GameScene from "./scenes/GameScene";
import { COLORS } from "./utils/constants";

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: COLORS.GRID_BG,
	resizeTo: window
});

const scene = new GameScene();
app.stage.addChild(scene);
