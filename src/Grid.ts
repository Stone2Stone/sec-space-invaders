import BadLicence from './BadLicence';
import { canvas } from './Canvas';
import GoodLicence from './GoodLicence';

class Grid {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  invaders: GoodLicence[] | BadLicence[];
  width: number;
  descend?: boolean | number;
  constructor(
    toggleArray: Array<Array<number>>,
    velocityXSpeed?: number,
    descend?: boolean | number
  ) {
    this.descend = descend;

    this.position = {
      x: 0,
      y: 0,
    };

    this.velocity = {
      x: velocityXSpeed ? velocityXSpeed : 0,
      y: typeof this.descend === "number" ? this.descend : 0,
    };

    this.invaders = [];

    const columns: number = toggleArray[0].length;
    const rows: number = toggleArray.length;
    this.width = columns * 60;
    let flattendedArray = toggleArray.flat();

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        let firstEl = flattendedArray.shift();
        switch (firstEl) {
          case 1:
            this.invaders.push(
              new GoodLicence({
                position: {
                  x: x * 60, // canvas.width / 1.6 - x * 60,
                  y: y * 60,
                },
              })
            );
            break;
          case 2:
            this.invaders.push(
              new BadLicence({
                position: {
                  x: x * 60, // canvas.width / 1.6 - x * 60,
                  y: y * 60,
                },
              })
            );
            break;
        }
      }
    }
  }

  update(): void {
    if (!(typeof this.descend === "boolean")) return;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y = 0;
    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x;

      this.velocity.y = this.descend ? 10 : 0;
    }
  }
}

export default Grid;
