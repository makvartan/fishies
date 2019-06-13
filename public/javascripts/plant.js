var maxPlants = 200;
class Plant {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.food = 5;
		this.size = 10;
		this.dead = false;
	}

	drawSelf() {
		fill(30, 100, 100, 100 * this.food / 5);
		ellipse(this.x, this.y, this.size, this.size);

	}

	update() {
		this.drawSelf();
		this.grow();
	}

	grow() {
		if (frameCount % 120 !== 0) { return; }

		if (random(1, 100) < 2) {
			this.dead = true;
		}

		if (this.food < 5 && random(4) < 1) {
			this.food += 1;
		}

		if (random(0, 10) < 5 && plantsArray.length < maxPlants) {
			let adjX = this.x + round(random(-1, 1)) * this.size;
			let adjY = this.y + round(random(-1, 1)) * this.size;

			let adjPlant = new Plant(adjX, adjY);

			if (plantsArray.find((otherPlant) =>
				dist(adjPlant.x, adjPlant.y, otherPlant.x, otherPlant.y) < adjPlant.size
			)) { return; }

			if (placeFree(adjPlant, adjX, adjY)) {
				plantsArray.push(adjPlant);
			}
		}
	}
}