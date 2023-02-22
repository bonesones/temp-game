class CollisionBlock {
  static width = 48;
  static height = 48;
  constructor({ position, name }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
    this.name = name;
  }

  draw() {
    c.fillStyle = "rgba(255, 0, 0, 0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
