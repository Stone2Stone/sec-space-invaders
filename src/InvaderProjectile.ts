import IMotion from './interface/IMotion';
import Projectile from './Projectile';

class InvaderProjectile extends Projectile {
  width: number;
  height: number;

  constructor({ position, velocity }: IMotion, canvas: HTMLCanvasElement) {
    super({ position, velocity }, canvas);
    this.width = 3;
    this.height = 10;
  }

  draw(): void {
    this.canvasContext.fillStyle = "red";
    this.canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export default InvaderProjectile;
