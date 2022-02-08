type NodeId = Number;

export type GameGridPoint = {
	id: NodeId;
	x: number;
	y: number;
}

export type GameGridEdge  = [NodeId, NodeId];


class GameGrid {
	public readonly points: GameGridPoint[];
	public readonly edges: GameGridEdge[];

	constructor(points: GameGridPoint[], edges: GameGridEdge[]) {
		this.points = points;
		this.edges = edges;
	}
}

export default GameGrid;