import { Container } from "pixi.js";

import GridLine from "../components/GridLine";
import gameDimensions from "../components/GameDimensions";
import { Orientation } from "../utils/enums";

export class GameScene extends Container {
	constructor() {
		super();

		this.x = window.innerWidth / 2 - gameDimensions.width / 2;
		this.y = window.innerHeight / 2 - gameDimensions.height / 2;

		this.drawGridLines();
	}

	private drawGridLines() {
		let gridLineHorizontalTop = new GridLine(Orientation.Horizontal, gameDimensions.height / 3);
		this.addChild(gridLineHorizontalTop);

		let gridLineHorizontalBottom = new GridLine(Orientation.Horizontal, gameDimensions.height * 2 / 3);
		this.addChild(gridLineHorizontalBottom);

		let gridLineVerticalLeft = new GridLine(Orientation.Vertical, gameDimensions.width / 3);
		this.addChild(gridLineVerticalLeft);

		let gridLineVerticalRight = new GridLine(Orientation.Vertical, gameDimensions.width * 2 / 3);
		this.addChild(gridLineVerticalRight);
	}
}

export default GameScene;