import { canvas } from './Canvas';
import IPosition from './interface/IPosition';
import IVelocity from './interface/IVelocity';
import InvaderProjectile from './InvaderProjectile';

abstract class Licence {
  posititon!: { x: number; y: number };
  velocity: { x: number; y: number };
  image!: HTMLImageElement;
  width!: number;
  height!: number;
  canvasContext: CanvasRenderingContext2D;

  constructor({ position }: IPosition, imgSrc: string) {
    //set licence initial velocity
    this.velocity = {
      x: 0,
      y: 0,
    };

    //set invader initial image
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      const SCALE: number = 1;
      this.image = image;
      //set invader initial size
      this.width = image.width * SCALE;
      this.height = image.height * SCALE;
      //set invader initial position
      this.posititon = {
        x: position.x,
        y: position.y,
      };
    };

    //get canvas context
    this.canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
  }
  //drawing out licence
  draw(): void {
    this.canvasContext.drawImage(
      this.image,
      this.posititon.x,
      this.posititon.y,
      this.width,
      this.height
    );
  }

  update({ velocity }: IVelocity): void {
    if (this.image) {
      this.draw();
      this.posititon.x += velocity.x;
      this.posititon.y += velocity.y;
    }
  }

  shoot(invaderProjectiles: InvaderProjectile[]): void {
    invaderProjectiles.push(
      new InvaderProjectile(
        {
          position: {
            x: this.posititon.x + this.width / 2,
            y: this.posititon.y + this.height,
          },
          velocity: {
            x: 0,
            y: 5,
          },
        },
        canvas
      )
    );
  }
}

export default Licence;
