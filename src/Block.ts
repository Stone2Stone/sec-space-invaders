import BlockSrc from '../img/block.png';
import { canvas, canvasContext } from './Canvas';

class Block {
  posititon!: { x: number; y: number };
  width!: number;
  height!: number;
  image!: HTMLImageElement;
  canvasContext: CanvasRenderingContext2D;
  constructor(Xposition?: number) {
    const image = new Image();
    image.src = BlockSrc;
    image.onload = () => {
      const SCALE: number = 0.4;
      this.image = image;
      this.width = image.width * SCALE;
      this.height = image.height * SCALE;
      this.posititon = {
        x: Xposition ? Xposition : 0, // canvas.width / 2 - this.width / 2,
        y: canvas.height / 2,
      };
    };

    this.canvasContext = canvasContext;
  }

  draw(): void {
    this.canvasContext.save();
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
    }
  }
}

export default Block;
