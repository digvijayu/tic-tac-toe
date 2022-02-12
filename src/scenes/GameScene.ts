import { Container, InteractionEvent, Rectangle } from "pixi.js";

import GridLine from "../components/GridLine";
import gameDimensions from "../components/GameDimensions";
import { Orientation } from "../utils/enums";
import Cross from "../components/Cross";
import Circle from "../components/Circle";

export class GameScene extends Container {
	constructor() {
		super();

		this.x = window.innerWidth / 2 - gameDimensions.width / 2;
		this.y = window.innerHeight / 2 - gameDimensions.height / 2;

		this.drawGridLines();
		this.drawX();

		this.interactive = true;
		this.hitArea = new Rectangle(0, 0, gameDimensions.width, gameDimensions.height);
		this.on('click', this.handleOnClick.bind(this))
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

	private drawX() {
		const cross = new Cross(333.3333333333333, 333.3333333333333);
		this.addChild(cross);

		const circle = new Circle(0,0);
		this.addChild(circle);
	}

	private handleOnClick(event: InteractionEvent) {
		let position = event.data.getLocalPosition(this);

		const row = position.x - (position.x % (gameDimensions.width / 3));
		const col = position.y - (position.y % (gameDimensions.width / 3));

		this.nextMove(row, col);
	}

	private nextMove(row: number, col: number) {
		// this.addChild(new Cross(row, col));
		this.addChild(new Circle(row, col));
	}
}

export default GameScene;