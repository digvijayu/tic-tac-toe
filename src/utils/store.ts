
import EventEmitter from "eventemitter3";

import { Player } from "./enums";

class StoreClass extends EventEmitter {
	private gridState: (Player | null)[][] = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];

	private nextMove: Player = Player.X;

	play(row: number, col: number) {
		this.gridState[row][col] = this.nextMove;

		// check row
		if (
			this.gridState[row][col] !== null &&
			this.gridState[row][0] === this.gridState[row][1] &&
			this.gridState[row][1] === this.gridState[row][2]
		) {
			this.emit('gameWon', this.nextMove, [[row, 0], [row, 1], [row, 2]]);
		}
		// check column
		else if (
			this.gridState[row][col] !== null &&
			this.gridState[0][col] === this.gridState[1][col] &&
			this.gridState[1][col] === this.gridState[2][col]
		) {
			this.emit('gameWon', this.nextMove, [[0, col], [1, col], [2, col]]);
		}
		// diagonal
		else if (
			this.gridState[1][1] !== null &&
			this.gridState[0][0] === this.gridState[1][1] &&
			this.gridState[1][1] === this.gridState[2][2]
		) {
			this.emit('gameWon', this.nextMove, [[0, 0], [1, 1], [2, 2]]);
		}
		// opp diagonal
		else if (
			this.gridState[1][1] !== null &&
			this.gridState[2][0] === this.gridState[1][1] &&
			this.gridState[1][1] === this.gridState[0][2]
		) {
			this.emit('gameWon', this.nextMove, [[2, 0], [1, 1], [0, 2]]);
		}

		if(this.checkIfAllBoxesAreFilled()) {
			this.emit('gameDraw');
		}

		this.nextMove = this.negatePlayer(this.nextMove);
	}

	private checkIfAllBoxesAreFilled() {
		for (let row of [0, 1, 2]) {
			for (let col of [0, 1, 2]) {
				if (this.gridState[row][col] === null) {
					return false;
				}
			}
		}
		return true;
	}

	getNextMove() {
		return this.nextMove;
	}

	getPreviousMove() {
		return this.negatePlayer(this.nextMove);
	}

	isValidMove(row: number, col: number) {
		return this.gridState[row][col] === null;
	}

	private negatePlayer(player: Player): Player {
		return player === Player.X ? Player.O : Player.X;
	}
}

let store = new StoreClass();
export default store;