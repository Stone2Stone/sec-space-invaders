export class Player {
  posititon!: { x: number; y: number };
  velocity: { x: number; y: number };
  rotation: number;
  width!: number;
  height!: number;
  image!: HTMLImageElement;
  canvasContext: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, playerImage: string) {
    //set player initial velocity
    this.velocity = {
      x: 0,
      y: 0,
    };

    //set player initial rotation
    this.rotation = 0;

    //set player initial image
    const image = new Image();
    image.src = playerImage;
    image.onload = () => {
      const SCALE: number = 0.15;
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
    this.canvasContext.drawImage(
      this.image,
      this.posititon.x,
      this.posititon.y,
      this.width,
      this.height
    );
  }

  update(): void {
    if (this.image) {
      this.draw();
      this.posititon.x += this.velocity.x;
    }
  }
}

export default Player;
