import { Container, Graphics, Ticker } from "pixi.js";
import { COLORS, CROSS_STRIKE } from "../../utils/constants";
import gameDimension from "../GameDimensions";

export default class Circle extends Container {
	private circle = new Graphics(); 
	private radius = 50; 
	private factor = 0;
	private center: [number, number] = [0,0];

	constructor(x: number, y: number){
		super();

		this.x = x;
		this.y = y;

		this.center = [gameDimension.width/3/2, gameDimension.height/3/2]

		this.circle.lineStyle(CROSS_STRIKE, COLORS.LINES);
		this.circle.drawCircle(this.center[0], this.center[1], 0);
		this.addChild(this.circle);

		Ticker.shared.add(this.updateCircle, this);
	}

	updateCircle() {
		if (this.factor >= 1) {
			Ticker.shared.remove(this.updateCircle, this);
		}
		this.factor += 0.01;
		this.circle.drawCircle(this.center[0], this.center[1], this.radius * this.factor);
	}
}