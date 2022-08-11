import BadLicence from './BadLicence';
import { canvas } from './Canvas';
import GoodLicence from './GoodLicence';

class Grid {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  invaders: GoodLicence[] | BadLicence[];
  width: number;
  constructor(licence: string, row: number, column: number) {
    this.position = {
      x: 0,
      y: 0,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.invaders = [];
    const columns: number = column; // Math.floor(Math.random() * 10 + 5);
    const rows: number = row; // Math.floor(Math.random() * 5 + 2);

    this.width = columns * 30;

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        switch (licence) {
          case "good":
            this.invaders.push(
              new GoodLicence({
                position: {
                  x: canvas.width / 1.6 - x * 60,
                  y: y * 60,
                },
              })
            );
            break;
          case "bad":
            this.invaders.push(
              new BadLicence({
                position: {
                  x: canvas.width / 1.6 - x * 60,
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
    // this.position.x += this.velocity.x;
    // this.position.y += this.velocity.y;
    // this.velocity.y = 0;
    // if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
    // this.velocity.x = -this.velocity.x;
    // this.velocity.y = 30;
    // }
  }
}

export default Grid;
