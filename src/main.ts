import './style.css';

import Player from './Player';
import { canvas } from './selectors';

//get canvas space
const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

// set canvas dimensions
canvas.width = innerWidth;
canvas.height = innerHeight;

//instantiate Player
let player = new Player(canvas, "../img/spaceship.png");

//create key object
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  shoot: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  const SPEED: number = 5;
  player.update();

  // while (player.posititon.x >= 0) {
  if ((keys.a.pressed || keys.ArrowLeft.pressed) && player.posititon.x >= 0) {
    return (player.velocity.x = -SPEED);
  }

  if (
    (keys.d.pressed || keys.ArrowRight.pressed) &&
    player.posititon.x + player.width <= canvas.width
  ) {
    return (player.velocity.x = SPEED);
  }
  // }

  return (player.velocity.x = 0);
}

animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      break;
    case " ":
      keys.shoot.pressed = true;
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case " ":
      keys.shoot.pressed = false;
      break;
  }
});

addEventListener;
