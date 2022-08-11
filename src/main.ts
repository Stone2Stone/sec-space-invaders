import './style.css';

import animateLose from './AnimateLose';
import animateWin from './AnimateWin';
import BadLicence from './BadLicence';
import { canvas, canvasContext } from './Canvas';
import createParticle from './CreateParticle';
import { levelEl, scoreEl } from './Elements';
import GoodLicence from './GoodLicence';
import Grid from './Grid';
import { heartElements, heartOutlineElements } from './HeartEl';
import InvaderProjectile from './InvaderProjectile';
import Particle from './Particle';
import Player from './Player';
import PlayerProjectile from './PlayerProjectile';

const SPEED: number = 5;

//instantiate Player
const player = new Player(canvas);

//create player projectiles
const playerProjectiles: PlayerProjectile[] = [];

//create invader
const grids: Grid[] = [];

//create invader projectiles
const invaderProjectiles: InvaderProjectile[] = [];

//create particle
const particles: Particle[] = [];

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

let frames: number = 0;
let game = {
  over: false,
  active: true,
};
let score: number = 0;
let respawnCount: number = 0;
let lives: number = 5;
let level: number = 1;

function animateGame() {
  if (game.active) requestAnimationFrame(animateGame);
  canvasContext.fillStyle = "#150D1F";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  particles.forEach((particle, index) => {
    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(index, 1);
      }, 0);
    } else {
      particle.update();
    }
  });
  invaderProjectiles.forEach((invaderProjectile, index) => {
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
      canvas.height
    ) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
      }, 0);
    } else invaderProjectile.update();

    if (
      invaderProjectile.position.y + invaderProjectile.height >=
        player.posititon.y &&
      invaderProjectile.position.x + invaderProjectile.width >=
        player.posititon.x &&
      invaderProjectile.position.x <= player.posititon.x + player.width
    ) {
      if (lives <= 0) {
        game.over = false;
        return requestAnimationFrame(animateLose);
      } else {
        lives--;

        heartElements[lives].classList.add("hide");
        heartOutlineElements[lives].classList.remove("hide");

        setTimeout(() => {
          invaderProjectiles.splice(index, 1);

          const respawnPlayerID = setInterval(respawnPlayer, 500);

          const checkRespawnCount = () => {
            if (respawnCount > 5) {
              respawnCount = 0;
              clearInterval(respawnPlayerID);
            }
          };

          function respawnPlayer() {
            respawnCount++;
            switch (player.opacity) {
              case 0:
                player.opacity = 1;
                player.update();
                break;
              case 1:
                player.opacity = 0;
                player.update();
                break;
            }

            checkRespawnCount();
          }
        }, 0);
        createParticle({
          particles: particles,
          object: player,
          color: "white",
        });
      }
    }
  });

  playerProjectiles.forEach((playerProjectile, index) => {
    if (playerProjectile.position.y + playerProjectile.radius <= 0) {
      setTimeout(() => {
        playerProjectiles.splice(index, 1);
      }, 0);
    }
    return playerProjectile.update();
  });

  grids.forEach((grid, gridIndex) => {
    grid.update();

    //spawn projectile
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      const licence =
        grid.invaders[Math.floor(Math.random() * grid.invaders.length)];

      licence instanceof BadLicence && licence.shoot(invaderProjectiles);
    }

    grid.invaders.forEach((invader, i) => {
      invader.update({ velocity: grid.velocity });

      playerProjectiles.forEach((playerProjectile, j) => {
        if (
          playerProjectile.position.y - playerProjectile.radius <=
            invader.posititon.y + invader.height &&
          playerProjectile.position.x + playerProjectile.radius >=
            invader.posititon.x &&
          playerProjectile.position.x - playerProjectile.radius <=
            invader.posititon.x + invader.width &&
          playerProjectile.position.y + playerProjectile.radius >=
            invader.posititon.y
        ) {
          setTimeout(() => {
            const invaderFound: BadLicence | GoodLicence | undefined =
              grid.invaders.find((invader2) => {
                return invader2 === invader;
              });

            const projectileFound: PlayerProjectile | undefined =
              playerProjectiles.find((playerProjectile2) => {
                return playerProjectile2 === playerProjectile;
              });

            if (invaderFound && projectileFound) {
              score += 100;
              scoreEl.innerHTML = `${score}`;
              createParticle({
                particles: particles,
                object: invader,
              });
              grid.invaders.splice(i, 1);
              playerProjectiles.splice(j, 1);

              if (grid.invaders.length > 0) {
                const firstInvader: BadLicence | GoodLicence = grid.invaders[0];
                const lastInvader: BadLicence | GoodLicence =
                  grid.invaders[grid.invaders.length - 1];

                grid.width =
                  lastInvader.posititon.x -
                  firstInvader.posititon.x +
                  lastInvader.width;
                grid.position.x = firstInvader.posititon.x;
              } else {
                grids.splice(gridIndex, 1);
                playerProjectiles.splice(0, playerProjectiles.length);
                invaderProjectiles.splice(0, invaderProjectiles.length);
                particles.splice(0, particles.length);
                // setTimeout(() => {
                level = level + 1;
                console.log(level);
                levelEl.innerHTML = `${level}`;
                switch (level) {
                  case 2:
                    grids.push(new Grid("bad", 10, 10));
                    return;
                  case 3:
                    grids.push(new Grid("bad", 2, 2));
                    return;
                  case 4:
                    grids.push(new Grid("bad", 3, 3));
                    return;
                  default:
                    animateWin();
                    return;
                }
                // }, 1000);
              }
            }
          }, 0);
        }
      });
    });
  });

  //spawn new enemies
  if (frames === 0) {
    grids.push(new Grid("good", 1, 1));
  }

  frames++;

  if ((keys.a.pressed || keys.ArrowLeft.pressed) && player.posititon.x >= 0) {
    return (player.velocity.x = -SPEED);
  }

  if (
    (keys.d.pressed || keys.ArrowRight.pressed) &&
    player.posititon.x + player.width <= canvas.width
  ) {
    return (player.velocity.x = SPEED);
  }

  return (player.velocity.x = 0);
}

if (!game.over) {
  animateGame();
} else {
  animateLose();
}

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
      playerProjectiles.push(
        new PlayerProjectile(
          {
            position: {
              x: player.posititon.x + player.width / 2,
              y: player.posititon.y,
            },
            velocity: { x: 0, y: -10 },
          },
          canvas
        )
      );
      keys.shoot.pressed = true;
      break;
    case "p":
      game.active = !game.active;
      animateGame();
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
  }
});
