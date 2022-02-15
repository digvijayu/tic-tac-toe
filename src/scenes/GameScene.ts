import { Container, InteractionEvent, Rectangle } from "pixi.js";

import GridLine from "../components/GridLine";
import gameDimensions from "../components/GameDimensions";
import { Orientation, Player } from "../utils/enums";
import Cross from "../components/Cross";
import Circle from "../components/Circle";
import store from "../utils/store";
import { random } from "../utils/brain";

export class GameScene extends Container {
	private gameOver = false;
	constructor() {
		super();

		this.x = window.innerWidth / 2 - gameDimensions.width / 2;
		this.y = window.innerHeight / 2 - gameDimensions.height / 2;

		this.drawGridLines();

		this.interactive = true;
		this.hitArea = new Rectangle(0, 0, gameDimensions.width, gameDimensions.height);
		this.on('click', this.handleOnClick.bind(this));
		store.on('gameWon', this.handleOnWin.bind(this));
		store.on('gameDraw', this.handleOnDraw.bind(this));
	}

	handleOnWin(winnerPlayer: Player, winningLine: number[][]) {
		this.gameOver = true;
		console.log("win", winnerPlayer, winningLine);
	}

	handleOnDraw() {
		this.gameOver = true;
		console.log("game is draw");
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

	private handleOnClick(event: InteractionEvent) {
		if(this.gameOver) {
			return;
		}
		let position = event.data.getLocalPosition(this);

		const rowX = position.x - (position.x % (gameDimensions.width / 3));
		const colY = position.y - (position.y % (gameDimensions.width / 3));

		const row = colY / (gameDimensions.width / 3);
		const col = rowX / (gameDimensions.width / 3);
		if (store.isValidMove(row, col)) {
			this.nextMove(rowX, colY, store.getNextMove());
			store.play(row, col);
			
			if(this.gameOver) {
				return;
			}
			let [nextRow, nextCol] = random(store.getGridState())
			this.nextMove(nextCol * (gameDimensions.width / 3), nextRow * (gameDimensions.width / 3), store.getNextMove());
			store.play(nextRow, nextCol);
		}
	}

	private nextMove(row: number, col: number, player: Player) {
		if (player === Player.X) {
			this.addChild(new Cross(row, col));
		}
		else {
			this.addChild(new Circle(row, col));
		}
	}
}

export default GameScene;