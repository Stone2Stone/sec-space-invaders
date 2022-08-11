import IMotion from './interface/IMotion';

abstract class Projectile {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  canvasContext: CanvasRenderingContext2D;

  constructor({ position, velocity }: IMotion, canvas: HTMLCanvasElement) {
    this.position = position;
    this.velocity = velocity;
    this.canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  abstract draw(): void;

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export default Projectile;
