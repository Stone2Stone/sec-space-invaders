export class Player {
  posititon: { x: number; y: number };
  velocity: { x: number; y: number };
  width: number;
  height: number;
  canvasContext: CanvasRenderingContext2D;

  constructor(canvasContext: CanvasRenderingContext2D) {
    //set player initial position
    this.posititon = {
      x: 200,
      y: 200,
    };

    //set player initial velocity
    this.velocity = {
      x: 0,
      y: 0,
    };

    // this.image =

    //set player initial size
    this.width = 100;
    this.height = 100;

    //get canvas context
    this.canvasContext = canvasContext;
  }

  //drawing out player
  draw(): void {
    this.canvasContext.fillStyle = "red";
    this.canvasContext.fillRect(
      this.posititon.x,
      this.posititon.y,
      this.width,
      this.height
    );
  }
}

export default Player;
