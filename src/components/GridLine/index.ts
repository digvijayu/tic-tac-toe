import { Container, Graphics, Ticker } from 'pixi.js'

import { Orientation } from '../../utils/enums';
import gameDimension from '../GameDimensions';
import { COLORS, LINE_THICKNESS } from '../../utils/constants';

export default class GridLine extends Container {
	line = new Graphics();
	orientation: Orientation;
	positionFromAxis: number = 0;

	private factor: number = 0;

	constructor(orientation: Orientation, positionFromAxis: number) {
		super();

		this.orientation = orientation;
		this.positionFromAxis = positionFromAxis;

		this.line.lineStyle(LINE_THICKNESS, COLORS.LINES);
		this.addChild(this.line);

		Ticker.shared.add(this.updateLine, this);
	}

	updateLine() {
		if (this.factor >= 1) {
			Ticker.shared.remove(this.updateLine, this);
		}

		let fromX = this.orientation === Orientation.Horizontal ? gameDimension.width / 2 - gameDimension.width / 2 * this.factor : this.positionFromAxis;
		let fromY = this.orientation === Orientation.Horizontal ? this.positionFromAxis : gameDimension.height / 2 - gameDimension.height / 2 * this.factor;

		let toX = this.orientation === Orientation.Horizontal ? gameDimension.width / 2 + gameDimension.width / 2 * this.factor : this.positionFromAxis;
		let toY = this.orientation === Orientation.Horizontal ? this.positionFromAxis : gameDimension.height / 2 + gameDimension.height / 2 * this.factor;

		this.line.moveTo(fromX, fromY);
		this.line.lineTo(toX, toY);

		this.factor = this.factor + 0.03 ;
	}
}