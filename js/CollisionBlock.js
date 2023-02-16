class CollisionBlock {
	static width = 48;
	static height = 48;
	constructor({ position }) {
		this.position = position;
		this.width = 48;
		this.height = 48;
	}

	draw() {
		c.fillStyle = "rgba(255, 0, 0, 0)";
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}
