function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + 40 <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function checkForCharacterCollision({ characters, player, characterOffset = { x: 0, y: 0 } }) {
  player.interactionAsset = null;
  // monitor for character collision
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];

    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...character,
          position: {
            x: character.position.x + characterOffset.x,
            y: character.position.y + characterOffset.y,
          },
        },
      })
    ) {
      player.interactionAsset = character;
      break;
    }
  }
}
function parse2D(data) {
  const rows = [];
  for (let i = 0; i < data.length; i += 70) {
    rows.push(data.slice(i, i + 70));
  }

  return rows;
}

function createObjectsFrom2D(data, data2) {
  const objects = [];
  data.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1025 || symbol === 1030) {
        // push a new collision into collisionblocks array
        boundaries.push(
          new CollisionBlock({
            position: {
              x: j * CollisionBlock.width + offset.x,
              y: i * CollisionBlock.height + offset.y,
            },
            name: symbol,
          }),
        );
      }
    });
  });
  data2.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 485 || symbol === 486 || symbol === 487) {
        boundaries.push(
          new CollisionBlock({
            position: {
              x: j * CollisionBlock.width + offset.x,
              y: i * CollisionBlock.height + offset.y,
            },
            name: symbol,
          }),
        );
      }
    });
  });

  return objects;
}
