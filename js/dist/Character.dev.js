"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Character =
/*#__PURE__*/
function (_Sprite) {
  _inherits(Character, _Sprite);

  function Character(_ref) {
    var _this;

    var position = _ref.position,
        velocity = _ref.velocity,
        image = _ref.image,
        _ref$frames = _ref.frames,
        frames = _ref$frames === void 0 ? {
      max: 1,
      hold: 10
    } : _ref$frames,
        sprites = _ref.sprites,
        _ref$animate = _ref.animate,
        animate = _ref$animate === void 0 ? false : _ref$animate,
        _ref$rotation = _ref.rotation,
        rotation = _ref$rotation === void 0 ? 0 : _ref$rotation,
        _ref$scale = _ref.scale,
        scale = _ref$scale === void 0 ? 1 : _ref$scale,
        _ref$dialogue = _ref.dialogue,
        dialogue = _ref$dialogue === void 0 ? [""] : _ref$dialogue;

    _classCallCheck(this, Character);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Character).call(this, {
      position: position,
      velocity: velocity,
      image: image,
      frames: frames,
      sprites: sprites,
      animate: animate,
      rotation: rotation,
      scale: scale
    }));
    _this.dialogue = dialogue;
    _this.dialogueIndex = 0;
    return _this;
  }
  /*draw() {
   	c.fillStyle = "rgba(255, 255, 0, 0.5)";
   	c.fillRect(this.position.x, this.position.y, this.width, this.height);
   } */


  return Character;
}(Sprite);