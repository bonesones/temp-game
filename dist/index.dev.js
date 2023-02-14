"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = 64 * 16; // 1024

canvas.height = 64 * 9; // 576

var offset = {
  x: -735,
  y: -650
}; // let battleZonesMap = parse2D(battleZonesData);

var itemZones = parse2D(itemsZonesData);
var boundaries = [];
var portal = [];
var collisionsMap;
var collisionBlocks;
var image;
var background;
var foregroundImage;
var foreground;
var movables;
var renderables;
var lvl = 0;
var boundWidth = 48;
var boundHeight = 48;
var characters = [];
var babkaImg = new Image();
babkaImg.src = './img/babka/Idle.png';
var johnImg = new Image();
johnImg.src = './img/john/Idle.png';
var frankImg = new Image();
frankImg.src = './img/frank/Idle.png';
var itemImg = new Image();
itemImg.src = './img/item.png';
var charactersMap = parse2D(charactersMapData);
var itemZonesMap = parse2D(itemsZonesData);
charactersMap.forEach(function (row, i) {
  row.forEach(function (symbol, j) {
    // 487 === frank
    if (symbol === 485) {
      characters.push(new Character({
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
        dialogue: ['...', 'Hey mister, have you seen my Doggochu?']
      }));
    } // 486 === john
    else if (symbol === 487) {
        characters.push(new Character({
          name: 'frank',
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
          dialogue: ['My bones hurt.']
        }));
      } // 485 === babka
      else if (symbol === 486) {
          characters.push(new Character({
            name: 'frank',
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
            dialogue: ['My bones hurt.']
          }));
        }
  });
});
itemZonesMap.forEach(function (row, i) {
  row.forEach(function (symbol, j) {
    if (symbol === 424) {
      characters.push(new Character({
        position: {
          x: j * boundWidth + offset.x,
          y: i * boundHeight + offset.y
        },
        image: itemImg,
        scale: 1,
        dialogue: ['Вы сорвали цветы']
      }));
    } else if (symbol === 421) {
      characters.push(new Character({
        position: {
          x: j * boundWidth + offset.x,
          y: i * boundHeight + offset.y
        },
        image: itemImg,
        scale: 1,
        dialogue: ['Вы подняли яблоко']
      }));
    } else if (symbol === 422) {
      characters.push(new Character({
        position: {
          x: j * boundWidth + offset.x,
          y: i * boundHeight + offset.y
        },
        image: itemImg,
        scale: 1,
        dialogue: ['Вы схватили курицу']
      }));
    }
  });
});
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

itemZones;
var playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";
var playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";
var playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";
var playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";
var player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
});

var init = function init() {
  boundaries = [];
  portal = []; // player.position.x = canvas.width / 2 - 192 / 4 / 2;
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
      y: offset.y
    },
    image: image
  });
  foreground = new Sprite({
    position: {
      x: offset.x,
      y: offset.y
    },
    image: foregroundImage
  });
  var portalImg = new Image();
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

  movables = [background].concat(_toConsumableArray(boundaries), characters, [foreground]);
  renderables = [background].concat(_toConsumableArray(boundaries), characters, [player, foreground]);
};

var keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
};

function animate() {
  var animationId = window.requestAnimationFrame(animate);
  renderables.forEach(function (renderable) {
    renderable.draw();
  });
  var moving = true;
  player.animate = false;

  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
    player.image = player.sprites.up;
    checkForCharacterCollision({
      characters: characters,
      player: player,
      characterOffset: {
        x: 0,
        y: 3
      }
    });

    for (var i = 0; i < boundaries.length; i++) {
      var boundary = boundaries[i];

      if (rectangularCollision({
        rectangle1: player,
        rectangle2: _objectSpread({}, boundary, {
          position: {
            x: boundary.position.x,
            y: boundary.position.y + 3
          }
        })
      })) {
        player.animate = false;
        moving = false;
        break;
      }
    }

    if (moving) movables.forEach(function (movable) {
      movable.position.y += 3;
    });
  } else if (keys.a.pressed && lastKey === "a") {
    player.animate = true;
    player.image = player.sprites.left;
    checkForCharacterCollision({
      characters: characters,
      player: player,
      characterOffset: {
        x: 3,
        y: 0
      }
    });

    for (var _i = 0; _i < boundaries.length; _i++) {
      var _boundary = boundaries[_i];

      if (rectangularCollision({
        rectangle1: player,
        rectangle2: _objectSpread({}, _boundary, {
          position: {
            x: _boundary.position.x + 3,
            y: _boundary.position.y
          }
        })
      })) {
        player.animate = false;
        moving = false;
        break;
      }
    }

    if (moving) movables.forEach(function (movable) {
      movable.position.x += 3;
    });
  } else if (keys.s.pressed && lastKey === "s") {
    player.animate = true;
    player.image = player.sprites.down;
    checkForCharacterCollision({
      characters: characters,
      player: player,
      characterOffset: {
        x: 0,
        y: -3
      }
    });

    for (var _i2 = 0; _i2 < boundaries.length; _i2++) {
      var _boundary2 = boundaries[_i2];

      if (rectangularCollision({
        rectangle1: player,
        rectangle2: _objectSpread({}, _boundary2, {
          position: {
            x: _boundary2.position.x,
            y: _boundary2.position.y - 3
          }
        })
      })) {
        player.animate = false;
        moving = false;
        break;
      }
    }

    if (moving) movables.forEach(function (movable) {
      movable.position.y -= 3;
    });
  } else if (keys.d.pressed && lastKey === "d") {
    player.animate = true;
    player.image = player.sprites.right;
    checkForCharacterCollision({
      characters: characters,
      player: player,
      characterOffset: {
        x: -3,
        y: 0
      }
    });

    for (var _i3 = 0; _i3 < boundaries.length; _i3++) {
      var _boundary3 = boundaries[_i3];

      if (rectangularCollision({
        rectangle1: player,
        rectangle2: _objectSpread({}, _boundary3, {
          position: {
            x: _boundary3.position.x - 3,
            y: _boundary3.position.y
          }
        })
      })) {
        player.animate = false;
        moving = false;
        break;
      }
    }

    if (moving) movables.forEach(function (movable) {
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