class Reaction extends Character {
	constructor({
		position,
		velocity,
		image,
		frames = { max: 1, hold: 10 },
		sprites,
		animate = false,
		rotation = 0,
		scale = 1,
		onComplete,
		// dialogue = [""],
	}) {
		super({
			position,
			velocity,
			image,
			frames,
			sprites,
			animate,
			rotation,
			scale,
		});

		// this.dialogue = dialogue;
		this.onComplete = onComplete;
		this.dialogueIndex = 0;
	}

	draw() {
		// c.save();
		// c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
		// c.rotate(this.rotation);
		// c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);
		// c.globalAlpha = this.opacity;

		const crop = {
			position: {
				x: this.frames.val * (this.width / this.scale),
				y: 0,
			},
			width: this.image.width / this.frames.max,
			height: this.image.height,
		};

		const image = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			width: this.image.width / this.frames.max,
			height: this.image.height,
		};

		c.drawImage(
			this.image,
			crop.position.x,
			crop.position.y,
			crop.width,
			crop.height,
			image.position.x,
			image.position.y,
			image.width * this.scale,
			image.height * this.scale,
		);
		c.fillStyle = "rgba(255, 255, 0, 0.5)";
		c.fillRect(this.position.x, this.position.y, this.width, this.height);

		c.restore();

		if (!this.animate) return;

		if (this.frames.max > 1) {
			this.frames.elapsed++;
		}

		if (this.frames.elapsed % this.frames.hold === 0) {
			if (this.frames.val < this.frames.max - 1) this.frames.val++;
			else this.frames.val = 0;
		}
	}
	play() {
		console.log("onComplete");
		this.onComplete();
	}
}
