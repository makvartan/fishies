var cWidth = 500;
var cHeight = 500;

var fish;
var fishArray = [];
var plantsArray = [];
var rockArray = [];
var shark;

function setup() {
	console.clear();
	createCanvas(cWidth, cHeight);
	colorMode(HSB, 100);

	x = random(5, 280)
	shark = new Shark(x, x);


	while (plantsArray.length < 30) {
		plant = new Plant(random(cWidth - 20) + 10, random(cHeight - 20) + 10);
		plantsArray.push(plant);
	}

	while (rockArray.length < 10) {
		rock = new Rock(random(cWidth - 20) + 10, random(cHeight - 20) + 10);
		rockArray.push(rock);
	}
	while (fishArray.length < 10) {
		fish = new Fish(random(cWidth - 20) + 10, random(cHeight - 20) + 10);
		fish.mutate();
		var tries = 10;
		while (!placeFree(fish, fish.x, fish.y) && tries > 0) {
			fish.x = random(cWidth - 20) + 10;
			fish.y = random(cHeight - 20) + 10;
			tries -= 1;
		}
		fishArray.push(fish);
	}

}

function draw() {
	background(65, 70, 70);

	fishArray = fishArray.filter(f => f.dead === false);
	plantsArray = plantsArray.filter(p => p.dead === false);
	for (var eachFish of fishArray) {
		eachFish.drawSelf();
		eachFish.move();
		eachFish.eat();
	}

	for (var eachPlant of plantsArray) {
		eachPlant.update();
	}

	for (var eachRock of rockArray) {
		eachRock.update();
	}
	if (shark.dead) {
		return;
	}
	shark.drawSelf();
	shark.move();
    shark.eat();
}
function placeFree(obj, x, y) {
	if (x - obj.size / 2 < 0) { return false; }
	if (x + obj.size / 2 > cWidth) { return false; }
	if (y - obj.size / 2 < 0) { return false; }
	if (y + obj.size / 2 > cHeight) { return false; }

	for (var rock of rockArray) {
		var r1 = obj.size / 2;
		var r2 = rock.size / 2
		if (dist(rock.x, rock.y, x, y) < r1 + r2)
			return false;
	}

	return true;
}