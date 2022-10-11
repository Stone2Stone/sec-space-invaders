import { canvas } from './Canvas';
import ICreateParticle from './interface/ICreateParticle';
import Particle from './Particle';

function createParticle(
  { particles, object, color }: ICreateParticle,
  text: string
) {
  for (let i = 0; i < 5; i++) {
    particles.push(
      new Particle(
        {
          position: {
            x: object.posititon.x + object.width / 2,
            y: object.posititon.y + object.height / 2,
          },
          velocity: {
            x: (Math.random() - 0.5) * 3,
            y: (Math.random() - 0.5) * 3,
          },
        },
        canvas,
        Math.random() * 3,
        color || "#FFA500",
        text
      )
    );
  }
}

export default createParticle;
