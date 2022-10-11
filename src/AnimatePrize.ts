import prizesBg from '../img/prizes-pg.png';
import { canvas, canvasContext } from './Canvas';
import { textEl } from './Elements';
import livesEl from './LivesEl';

function animatePrize() {
  let background = new Image();
  background.src = prizesBg;
  background.onload = () => {
    canvasContext.drawImage(background, 0, 0, canvas.width, canvas.height);
  };
  !textEl.classList.contains("hide") && textEl.classList.add("hide");
  !livesEl.classList.contains("hide") && livesEl.classList.add("hide");
}

export default animatePrize;
