import IMotion from './interface/IMotion';
import Projectile from './Projectile';

class PlayerProjectile extends Projectile {
  radius: number;
  width: number;
  height: number;
  constructor({ position, velocity }: IMotion, canvas: HTMLCanvasElement) {
    super({ position, velocity }, canvas);
    this.radius = 3;
    this.width = 3;
    this.height = 10;
  }

  draw(): void {
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    this.canvasContext.fillStyle = `rgb(159, 90, 253)`;
    this.canvasContext.fill();
    this.canvasContext.closePath();
  }
}

export default PlayerProjectile;
