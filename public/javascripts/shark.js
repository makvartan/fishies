class Shark {
	constructor(x, y) {

		this.x = x;
		this.y = y;

		this.size = 30;
		this.speed = 7;
		this.hue = 60;
		this.food = 70;

		this.xvel = 0;
		this.yvel = 0;

		this.swimTiming = floor(random(120));
		this.dead = false;

		this.maxFood = 50;
	}

	drawSelf() {

		//no outline
		noStroke();
		//get direction fish is facing
		var angle = atan2(this.yvel, this.xvel);

		//transform the fish to face the right direction
		push();
		translate(this.x, this.y);
		rotate(angle);
		//draw an orange ellipse and triangle to represent the fish
		fill(this.hue, 100, 100);
		ellipse(0, 0, this.size * 1.25, this.size);
		triangle(-this.size / 2, 0, -this.size, -this.size / 3, -this.size, this.size / 3);
		pop(); //end transformation 

		var foodPercent = this.food / this.maxFood;
		fill(100, 0, 50, 50);
		rect(this.x - this.size, this.y - this.size / 2 - 5, this.size * 2, 3);

		fill(10, 100, 100);
		rect(this.x - this.size, this.y - this.size / 2 - 5, foodPercent * this.size * 2, 3);
	}

	move() {

		if (this.food <= 0) {
			this.dead = true;
		}

		if (frameCount % 120 === this.swimTiming) {
			this.xvel = random(-5, 5);
			this.yvel = random(-5, 5);

			if (this.food >= 30 && random(100) < 5) {
				this.reproduce();
			}
			let cost = ceil((this.size + this.speed) / 5);
			this.food -= cost;
		}

		if (placeFree(this, this.x + this.xvel, this.y)) {
			this.x += this.xvel;
		}
		if (placeFree(this, this.x, this.y + this.yvel)) {
			this.y += this.yvel;
		}
		this.xvel *= 0.95;
		this.yvel *= 0.95;

		if (this.hue > 100) {
			this.hue = 0;
		}
		if (this.hue < 0) {
			this.hue = 100;
		}
	}
	eat() {
		fishArray.forEach((fish) => {
			if (fish.food <= 0) { return; }
			if (dist(this.x, this.y, fish.x, fish.y) < this.size + fish.size) {
				fish.food--;
				this.food++;
			}
		})

		if (this.food >= this.maxFood) {
			this.food = this.maxFood;
			return;
		}

	}
	reproduce() {
		var shark = new Shark(this.x, this.y);

		shark.size = this.size;
		shark.speed = this.speed;
		shark.hue = this.hue;
		shark.mutate();


	}
	mutate() {
		if (random(100) < 75) {
			return;
		}
		this.size += random(-4, 4);
		this.speed += random(-1, 1);
		this.hue += random(-5, 5);


		if (this.size < 5) {
			this.size = 5;
		}
		if (this.speed < 3) {
			this.speed = 3;
		}
		this.maxfood = round(this.size * 3 + 10);
	}
}