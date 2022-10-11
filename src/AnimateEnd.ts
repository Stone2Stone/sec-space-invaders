import gameBg from '../img/game-bg.png';
import { canvas, canvasContext } from './Canvas';
import { textEl } from './Elements';
import livesEl from './LivesEl';

function animateEnd(score: number, gameFinished: boolean) {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(() => animateEnd(score, gameFinished));
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  let background = new Image();
  background.src = gameBg;
  background.onload = () => {
    canvasContext.drawImage(background, 0, 0, canvas.width, canvas.height);
  };
  canvasContext.fillStyle = "white";
  canvasContext.textAlign = "center";
  canvasContext.font = "64px Pixeloid Sans";
  canvasContext.fillText(
    `${gameFinished ? "CONGRATULATIONS" : "GAME OVER"}`,
    canvas.width / 2,
    canvas.height / 2
  );
  canvasContext.fillText(`${score}`, canvas.width / 2, canvas.height / 2 + 100);
  canvasContext.fillStyle = "#150D1F";
  !textEl.classList.contains("hide") && textEl.classList.add("hide");
  !livesEl.classList.contains("hide") && livesEl.classList.add("hide");
}

export default animateEnd;
