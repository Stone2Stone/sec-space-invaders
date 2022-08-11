import { canvas, canvasContext } from './Canvas';
import { textEl } from './Elements';
import livesEl from './LivesEl';

function animateLose() {
  requestAnimationFrame(animateLose);
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = "white";
  canvasContext.fillText(
    "GAME OVER",
    (canvas.width / 10) * 3,
    (canvas.width / 10) * 3
  );
  canvasContext.font = "64px Pixeloid Sans";
  canvasContext.fillStyle = "#150D1F";
  !textEl.classList.contains("hide") && textEl.classList.add("hide");
  !livesEl.classList.contains("hide") && livesEl.classList.add("hide");
}

export default animateLose;
