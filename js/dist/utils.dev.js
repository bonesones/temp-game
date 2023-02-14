"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function rectangularCollision(_ref) {
  var rectangle1 = _ref.rectangle1,
      rectangle2 = _ref.rectangle2;
  return rectangle1.position.x + rectangle1.width >= rectangle2.position.x && rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y + 40 <= rectangle2.position.y + rectangle2.height && rectangle1.position.y + rectangle1.height >= rectangle2.position.y;
}

function checkForCharacterCollision(_ref2) {
  var characters = _ref2.characters,
      player = _ref2.player,
      _ref2$characterOffset = _ref2.characterOffset,
      characterOffset = _ref2$characterOffset === void 0 ? {
    x: 0,
    y: 0
  } : _ref2$characterOffset;
  player.interactionAsset = null; // monitor for character collision

  for (var i = 0; i < characters.length; i++) {
    var character = characters[i];

    if (rectangularCollision({
      rectangle1: player,
      rectangle2: _objectSpread({}, character, {
        position: {
          x: character.position.x + characterOffset.x,
          y: character.position.y + characterOffset.y
        }
      })
    })) {
      player.interactionAsset = character;
      break;
    }
  }
}

function parse2D(data) {
  var rows = [];

  for (var i = 0; i < data.length; i += 70) {
    rows.push(data.slice(i, i + 70));
  }

  return rows;
}

function createObjectsFrom2D(data) {
  var objects = [];
  data.forEach(function (row, i) {
    row.forEach(function (symbol, j) {
      if (symbol === 1025) {
        // push a new collision into collisionblocks array
        boundaries.push(new CollisionBlock({
          position: {
            x: j * CollisionBlock.width + offset.x,
            y: i * CollisionBlock.height + offset.y
          }
        }));
      }
    });
  });
  return objects;
}