class Rock {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = random(10, 20);
	}
	drawSelf() {
		fill(0, 0, 50);
		ellipse(this.x, this.y, this.size, this.size);

	}

	update() {
		this.drawSelf();
	}

}