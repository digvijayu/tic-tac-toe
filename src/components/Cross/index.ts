import { Container, Graphics, Ticker } from "pixi.js";
import { COLORS, CROSS_STRIKE } from "../../utils/constants";

import gameDimensions from "../GameDimensions";

export default class Cross extends Container {
	private padding: number = gameDimensions.width/10;
	private size: number = gameDimensions.width/3 - this.padding;
	private lineLTRB = new Graphics(); // from left top to right bottom
	private lineRTLB = new Graphics(); // from right top to left bottom
	private factor = 0;


	constructor() {
		super();

		this.x = this.padding/2;
		this.y = this.padding/2;

		this.lineLTRB.lineStyle(CROSS_STRIKE, COLORS.LINES);
		this.addChild(this.lineLTRB);
		
		this.lineRTLB.lineStyle(CROSS_STRIKE, COLORS.LINES);
		this.lineRTLB.angle = 90;
		this.lineRTLB.x = this.size;
		this.lineRTLB.y = 0;
		this.addChild(this.lineRTLB);

		Ticker.shared.add(this.updateLine, this);
	}

	private updateLine() {
		if(this.factor >= 1){
			Ticker.shared.remove(this.updateLine, this);
		}
		
		this.factor += 0.02;
		const len = (this.size - this.padding/5) * this.factor;

		this.lineLTRB.moveTo(0, 0);
		this.lineLTRB.lineTo(len, len);
		
		this.lineRTLB.moveTo(0, 0);
		this.lineRTLB.lineTo(len, len);
	}
}