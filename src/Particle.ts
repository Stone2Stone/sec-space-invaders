import IMotion from './interface/IMotion';
import Projectile from './Projectile';

class Particle extends Projectile {
  radius: number;
  color: string;
  opacity: number;
  constructor(
    { position, velocity }: IMotion,
    canvas: HTMLCanvasElement,
    radius: number,
    color: string
  ) {
    super({ position, velocity }, canvas);
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
  }

  draw(): void {
    this.canvasContext.save();
    this.canvasContext.globalAlpha = this.opacity;
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    this.canvasContext.fillStyle = this.color;
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

export default Particle;
