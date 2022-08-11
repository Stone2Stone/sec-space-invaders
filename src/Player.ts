import spaceShip from '../img/spaceship.png';

class Player {
  posititon!: { x: number; y: number };
  velocity: { x: number; y: number };
  rotation: number;
  opacity: number;
  width!: number;
  height!: number;
  image!: HTMLImageElement;
  canvasContext: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    //set player initial velocity
    this.velocity = {
      x: 0,
      y: 0,
    };

    //set player initial rotation
    this.rotation = 0;

    //set player initial opacity
    this.opacity = 1;

    //set player initial image
    const image = new Image();
    image.src = spaceShip;
    image.onload = () => {
      const SCALE: number = 0.3;
      this.image = image;
      //set player initial size
      this.width = image.width * SCALE;
      this.height = image.height * SCALE;
      //set player initial position
      this.posititon = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20,
      };
    };

    //get canvas context
    this.canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  //drawing out player
  draw(): void {
    this.canvasContext.save();
    this.canvasContext.globalAlpha = this.opacity;
    this.canvasContext.drawImage(
      this.image,
      this.posititon.x,
      this.posititon.y,
      this.width,
      this.height
    );
    this.canvasContext.restore();
  }

  update(): void {
    if (this.image) {
      this.draw();
      this.posititon.x += this.velocity.x;
    }
  }
}

export default Player;
