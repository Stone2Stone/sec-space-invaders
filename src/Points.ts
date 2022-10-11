import IMotion from './interface/IMotion';
import Projectile from './Projectile';

class Points extends Projectile {
  color: string;
  opacity: number;
  constructor(
    { position, velocity }: IMotion,
    canvas: HTMLCanvasElement,
    color: string
  ) {
    super({ position, velocity }, canvas);
    this.color = color;
    this.opacity = 1;
  }

  draw(): void {
    this.canvasContext.save();
    this.canvasContext.globalAlpha = this.opacity;
    this.canvasContext.beginPath();
    this.canvasContext.font = "12px Pixeloid Sans";
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.fillText("100", this.position.x, this.position.y);
    this.canvasContext.fill();
    this.canvasContext.closePath();
    this.canvasContext.restore();
  }

  update(): void {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.opacity -= 0.01;
  }
}

export default Points;
