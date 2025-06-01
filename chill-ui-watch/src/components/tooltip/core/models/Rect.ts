export default class Rect {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get center() {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
  }
}
