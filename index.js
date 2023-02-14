const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

const offset = {
	x: -735,
	y: -650,
};
// let battleZonesMap = parse2D(battleZonesData);
let itemZones = parse2D(itemsZonesData);
let boundaries = [];
let portal = [];
let collisionsMap;
let collisionBlocks;
let image;
let background;
let foregroundImage;
let foreground;
let movables;
let renderables;
let lvl = 0;

const boundWidth = 48;
const boundHeight = 48;

let characters = [];

const babkaImg = new Image()
babkaImg.src = './img/babka/Idle.png'

const johnImg = new Image()
johnImg.src = './img/john/Idle.png'

const frankImg = new Image()
frankImg.src = './img/frank/Idle.png'

const itemImg = new Image();
itemImg.src = './img/item.png'

const charactersMap = parse2D(charactersMapData)
const itemZonesMap = parse2D(itemsZonesData)

charactersMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
	  // 487 === frank
	  if (symbol === 485) {
		characters.push(
		  new Character({
			name: 'frank',
			position: {
			  x: j * boundWidth + offset.x,
			  y: i * boundHeight + offset.y
			},
			image: frankImg,
			frames: {
			  max: 4,
			  hold: 60
			},
			scale: 3,
			animate: true,
			introDialogue: ['My bones hurt.'],
			errorDialogue: ['otday'],
			endDialogue: ['end'],
			outroDialogue: ['outro.']
		  })
		)
	  }
	  // 486 === john
	  else if (symbol === 487) {
		characters.push(
		  new Character({
			name: 'john',
			position: {
			  x: j * boundWidth + offset.x,
			  y: i * boundHeight + offset.y
			},
			image: johnImg,
			frames: {
			  max: 4,
			  hold: 60
			},
			scale: 3,
			animate: true,
			introDialogue: ['My bones hurt.'],
			errorDialogue: ['ты чорт'],
			endDialogue: ['end'],
			outroDialogue: ['outro.']
		  })
		)
	  }
	  // 485 === babka
	  else if (symbol === 486) {
		characters.push(
		  new Character({
			name: 'babka',
			position: {
			  x: j * boundWidth + offset.x,
			  y: i * boundHeight + offset.y
			},
			image: babkaImg,
			frames: {
			  max: 4,
			  hold: 60
			},
			scale: 3,
			animate: true,
			introDialogue: ['My bones hurt.'],
			errorDialogue: ['EE', 'kk'],
			endDialogue: ['end'],
			outroDialogue: ['outro.']
		  })
		)
	  }
	
	})
  })


itemZonesMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol === 424) {
			characters.push(
			  new Character({
				name: "flowers",
				position: {
				  x: j * boundWidth + offset.x,
				  y: i * boundHeight + offset.y
				},
				image: itemImg,
				scale: 1,
				introDialogue: ['Вы сорвали цветы'],
				errorDialogue: ['err'],
				endDialogue: ['end'],
				outroDialogue: ['outro.']
			  })
			)
		  }
		  else if (symbol === 421) {
			characters.push(
			  new Character({
				name: "apple",
				position: {
				  x: j * boundWidth + offset.x,
				  y: i * boundHeight + offset.y
				},
				image: itemImg,
				scale: 1,
				introDialogue: ['Вы подняли яблоко'],
				errorDialogue: ['err'],
				endDialogue: ['end'],
				outroDialogue: ['outro.']
			  })
			)
		  } else if (symbol === 422) {
			characters.push(
				new Character({
				  name: "chicken",
				  position: {
					x: j * boundWidth + offset.x,
					y: i * boundHeight + offset.y
				  },
				  image: itemImg,
				  scale: 1,
				  introDialogue: ['Вы схватили курицу'],
				  errorDialogue: ['err'],
				  endDialogue: ['end'],
				  outroDialogue: ['outro.']
				})
			  )
		  }
	})
})
/*characters.push(
	new Character({
	position: {
		x: 250,
		y: 250
	},
	image: villagerImg,
	frames: {
		max: 4,
		hold: 60
	},
	scale: 3,
	animate: true,
	dialogue: ['...', 'Hey mister, have you seen my Doggochu?']
	})
)

characters.push(
	new Character({
	position: {
		x: 200,
		y: 250
	},
	image: oldManImg,
	frames: {
		max: 4,
		hold: 90
	},
	scale: 3,
	animate: true,
	dialogue: ['My bones hurt.']
	})
)*/

itemZones

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";


const player = new Sprite({
	position: {
		x: canvas.width / 2 - 192 / 4 / 2,
		y: canvas.height / 2 - 68 / 2,
	},
	image: playerDownImage,
	frames: {
		max: 4,
		hold: 10,
	},
	sprites: {
		up: playerUpImage,
		left: playerLeftImage,
		right: playerRightImage,
		down: playerDownImage,
	},
});

const init = () => {
	boundaries = [];
	portal = [];
	
	// player.position.x = canvas.width / 2 - 192 / 4 / 2;
	// player.position.y = canvas.height / 2 - 68 / 2;

	collisionsMap = parse2D(collisions_level1);
	collisionBlocks = createObjectsFrom2D(collisionsMap, charactersMap);

	foregroundImage = new Image();
	foregroundImage.src = "./img/foregroundObjects.png";

	image = new Image();
	image.src = "./img/Pellet Town.png";

	background = new Sprite({
		position: {
			x: offset.x,
			y: offset.y,
		},
		image: image,
	});

	foreground = new Sprite({
		position: {
			x: offset.x,
			y: offset.y,
		},
		image: foregroundImage,
	});

	const portalImg = new Image();
	portalImg.src = "./img/portal.png";

	/* portal.push(
		new Reaction({
			position: {
				x: 177,
				y: 326,
			},
			image: portalImg,
			frames: {
				max: 1,
				hold: 60,
			},
			scale: 1,
			animate: true,
			onComplete: () => {
				console.log("OK");
				levels[1].init();
			},
			// dialogue: ["...", "Hey mister, have you seen my Doggochu?"],
		}),
	); */

	movables = [background, ...boundaries, ...characters, foreground];
	renderables = [
		background,
		...boundaries,
		...characters,
		player,
		foreground,
	];
};

const keys = {
	w: {
		pressed: false,
	},
	a: {
		pressed: false,
	},
	s: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
};

function animate() {
	const animationId = window.requestAnimationFrame(animate);
	renderables.forEach((renderable) => {
		renderable.draw();
	});

	let moving = true;
	player.animate = false;

	if (keys.w.pressed && lastKey === "w") {
		player.animate = true;
		player.image = player.sprites.up;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: 0, y: 3 },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x,
							y: boundary.position.y + 3,
						},
					},
				})
			) {
				player.animate = false;
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.y += 3;
			});
	} else if (keys.a.pressed && lastKey === "a") {
		player.animate = true;
		player.image = player.sprites.left;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: 3, y: 0 },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x + 3,
							y: boundary.position.y,
						},
					},
				})
			) {
				player.animate = false;
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.x += 3;
			});
	} else if (keys.s.pressed && lastKey === "s") {
		player.animate = true;
		player.image = player.sprites.down;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: 0, y: -3 },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x,
							y: boundary.position.y - 3,
						},
					},
				})
			) {
				player.animate = false;
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.y -= 3;
			});
	} else if (keys.d.pressed && lastKey === "d") {
		player.animate = true;
		player.image = player.sprites.right;

		checkForCharacterCollision({
			characters,
			player,
			characterOffset: { x: -3, y: 0 },
		});

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				rectangularCollision({
					rectangle1: player,
					rectangle2: {
						...boundary,
						position: {
							x: boundary.position.x - 3,
							y: boundary.position.y,
						},
					},
				})
			) {
				player.animate = false;
				moving = false;
				break;
			}
		}

		if (moving)
			movables.forEach((movable) => {
				movable.position.x -= 3;
			});
	}
}
init();
animate();

/* const btn = document.querySelector("button");

btn.addEventListener("click", function () {
	console.log("button");
	lvl++;
	if (lvl % 2 != 0) levels[1].init();
	else levels[0].init();
}); */