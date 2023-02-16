class Character extends Sprite {
	constructor({
		name,
		position,
		velocity,
		image,
		frames = { max: 1, hold: 10 },
		sprites,
		animate = false,
		rotation = 0,
		scale = 1,
		introDialogue = [""],
		errorDialogue = [""],
		endDialogue = [""],
		outroDialogue = [""]
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

		this.name = name;

		this.introDialogue = introDialogue;
		this.outroDialogue = outroDialogue;
		this.errorDialogue = errorDialogue;
		this.endDialogue = endDialogue;
		this.dialogueIndex = 0;
	}
	/*draw() {
	 	c.fillStyle = "rgba(255, 255, 0, 0.5)";
	 	c.fillRect(this.position.x, this.position.y, this.width, this.height);
	 } */
}
