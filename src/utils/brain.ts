import { Player } from "./enums";

export function random(grid: (Player | null)[][]): [number, number] {
	let availableSlots: [number, number][] = [];
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			if (grid[row][col] === null) {
				availableSlots.push([row, col]);
			}
		}
	}

	const randomIndex = Math.floor(Math.random() * availableSlots.length);
	console.log("random move: ", randomIndex, availableSlots, availableSlots[randomIndex], grid);
	return availableSlots[randomIndex];
}