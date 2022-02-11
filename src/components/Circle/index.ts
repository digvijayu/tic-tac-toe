import { Container, Graphics, Ticker } from "pixi.js";
import { COLORS, CROSS_STRIKE } from "../../utils/constants";

export default class Circle extends Container {
	private circle = new Graphics(); 
	private radius = 50; 
	private factor = 0;

	constructor(){
		super();
		this.circle.lineStyle(CROSS_STRIKE, COLORS.LINES);
		this.circle.drawCircle(0, 0, 0);
		this.addChild(this.circle);

		Ticker.shared.add(this.updateCircle, this);
	}

	updateCircle() {
		if (this.factor >= 1) {
			Ticker.shared.remove(this.updateCircle, this);
		}
		this.factor += 0.01;
		this.circle.drawCircle(0, 0, this.radius * this.factor);
	}
}