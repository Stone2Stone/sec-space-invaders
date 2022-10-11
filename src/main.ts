import '../style.css';

// import gameBg from '../img/game-bg.png';
import animateEnd from './AnimateEnd';
import animateIntro from './AnimateIntro';
import animatePrize from './AnimatePrize';
import BadLicence from './BadLicence';
import Block from './Block';
import { canvas, canvasContext } from './Canvas';
import createParticle from './CreateParticle';
import { formEl, levelEl, scoreEl, textEl } from './Elements';
import GoodLicence from './GoodLicence';
import Grid from './Grid';
import { heartElements, heartOutlineElements } from './HeartEl';
// import ILeaderboard from './interface/ILeaderboard';
import InvaderProjectile from './InvaderProjectile';
// import fetchLeaderboardData from './Leaderboard';
import livesEl from './LivesEl';
import Particle from './Particle';
import Player from './Player';
import PlayerProjectile from './PlayerProjectile';

const SPEED: number = 5;

//instantiate Player
const player = new Player(canvas);

const blocks: Block[] = [];

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
  if (!game.active) return;
  requestAnimationFrame(animateGame);
  // setTimeout(() => {
  //   let background = new Image();
  //   background.src = gameBg;
  //   canvasContext.drawImage(background, 0, 0, canvas.width, canvas.height);
  // }, 0);
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
        return gameOver();
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
        createParticle(
          {
            particles: particles,
            object: player,
            color: "white",
          },
          "0"
        );
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

    // spawn projectile
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      const licence =
        grid.invaders[Math.floor(Math.random() * grid.invaders.length)];

      licence instanceof BadLicence && licence.shoot(invaderProjectiles);
    }

    grid.invaders.forEach((invader, i) => {
      invader.update({ velocity: grid.velocity });

      if (
        invader.posititon.y + invader.height >= player.posititon.y &&
        invader.posititon.x + invader.width >= player.posititon.x &&
        invader.posititon.x <= player.posititon.x + player.width
      ) {
        game.over = false;
        return gameOver();
      }
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
              if (invaderFound instanceof BadLicence) {
                score += 100;
                createParticle(
                  {
                    particles: particles,
                    object: invader,
                    color: "green",
                  },
                  "+100"
                );
              } else if (invaderFound instanceof GoodLicence) {
                score -= 100;
                createParticle(
                  {
                    particles: particles,
                    object: invader,
                    color: "red",
                  },
                  "-100"
                );
              }
              scoreEl.innerHTML = `${score}`;
              grid.invaders.splice(i, 1);
              playerProjectiles.splice(j, 1);

              if (
                grid.invaders.some((invader) => invader instanceof BadLicence)
              ) {
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
                blocks.splice(0, blocks.length);
                setTimeout(() => {
                  level = level + 1;
                  levelEl.innerHTML = `${level}`;
                  switch (level) {
                    case 2:
                      blocks.push(
                        new Block(10),
                        new Block(300),
                        new Block(600),
                        new Block(canvas.width - 143)
                      );
                      grids.push(
                        new Grid(
                          [
                            [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1],
                            [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1],
                            [2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1],
                            [2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1],
                          ],
                          2,
                          true
                        )
                      );

                      return;
                    case 3:
                      blocks.push(
                        new Block(10),
                        new Block(300),
                        new Block(600),
                        new Block(canvas.width - 143)
                      );

                      grids.push(
                        new Grid(
                          [
                            [2, 0, 1, 0, 0, 2, 0, 1, 2, 0, 1, 0, 0],
                            [2, 0, 1, 2, 0, 1, 0, 0, 2, 0, 1, 2, 0],
                            [1, 0, 0, 2, 0, 1, 2, 0, 1, 0, 0, 2, 0],
                            [1, 2, 0, 1, 0, 0, 2, 0, 1, 2, 0, 1, 0],
                          ],
                          2,
                          true
                        )
                      );
                      return;
                    case 4:
                      blocks.push(
                        new Block(10),
                        new Block(300),
                        new Block(600),
                        new Block(canvas.width - 143)
                      );
                      grids.push(
                        new Grid(
                          [
                            [0, 1, 1, 1, 0, 1, 2, 2, 2, 1, 1, 2, 2],
                            [2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1],
                            [2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2],
                            [1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2],
                            [2, 2, 1, 1, 2, 2, 2, 1, 0, 1, 1, 1, 0],
                          ],
                          1,
                          true
                        )
                      );
                      return;
                    default:
                      animateEnd(score, true);
                      return;
                  }
                }, 1000);
              }
            }
          }, 0);
        }

        level > 1 &&
          blocks.forEach((block) => {
            if (
              playerProjectile.position.y - playerProjectile.radius <=
                block.posititon.y + block.height &&
              playerProjectile.position.x + playerProjectile.radius >=
                block.posititon.x &&
              playerProjectile.position.x - playerProjectile.radius <=
                block.posititon.x + block.width &&
              playerProjectile.position.y + playerProjectile.radius >=
                block.posititon.y
            ) {
              playerProjectiles.splice(j, 1);
            }
          });
      });
    });
  });

  if (level > 1) {
    blocks.forEach((block) => {
      block.update();
    });
  }

  //spawn new enemies
  if (frames === 0) {
    grids.push(
      new Grid(
        [
          [2, 0, 1, 0, 0, 2, 0, 1, 2, 0, 1, 0, 0],
          [2, 0, 1, 2, 0, 1, 0, 0, 2, 0, 1, 2, 0],
          [1, 0, 0, 2, 0, 1, 2, 0, 1, 0, 0, 2, 0],
          [1, 2, 0, 1, 0, 0, 2, 0, 1, 2, 0, 1, 0],
        ],
        2,
        true
      )
    );
    // for (let i = 0; i < 3; i++) {
    //   new Block(canvas, { x: i, y: canvas.width / 2 }).draw();
    // }
    // new Block(canvas, { x: canvas.width / 2, y: canvas.height / 2 }).draw();
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

function gameActiveUp(e: KeyboardEvent) {
  if (!game.over) {
    switch (e.key) {
      case "a":
        keys.a.pressed = false;
        return;
      case "d":
        keys.d.pressed = false;
        return;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        return;
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        return;
    }
  }
}

function gameActiveDown(e: KeyboardEvent) {
  if (!game.over) {
    switch (e.key) {
      case "a":
        keys.a.pressed = true;
        return;
      case "d":
        keys.d.pressed = true;
        return;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        return;
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        return;
      case " ":
        e.preventDefault();
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
        return;
      case "p":
        if (!game.over) {
          game.active = !game.active;
          animateGame();
        }
    }
  }
}

function gamePrize(e: KeyboardEvent) {
  if (!game.over) {
    switch (e.key) {
      case "b":
        animateIntro();
        addEventListener("keydown", gameIntro);
        break;
    }
  }
}

function gameIntro(e: KeyboardEvent) {
  switch (e.key) {
    case "Enter":
      animateGame();
      textEl.classList.contains("hide") && textEl.classList.remove("hide");
      livesEl.classList.contains("hide") && livesEl.classList.remove("hide");
      removeEventListener("keydown", gameIntro);
      removeEventListener("keydown", gamePrize);
      addEventListener("keyup", gameActiveUp);
      addEventListener("keydown", gameActiveDown);
      break;
    case "p":
      animatePrize();
      removeEventListener("keydown", gameIntro);
      addEventListener("keydown", gamePrize);
      break;
  }
}

function gameOver() {
  playerProjectiles.splice(0, playerProjectiles.length);
  invaderProjectiles.splice(0, invaderProjectiles.length);
  removeEventListener("keyup", gameActiveUp);
  removeEventListener("keydown", gameActiveDown);
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  animateEnd(score, false);
}

addEventListener("keydown", gameIntro);

if (!game.over) {
  // const leaderboardData: ILeaderboard[] = await fetchLeaderboardData<
  //   ILeaderboard[]
  // >();
  // leaderboardData.forEach(({ name, score }) => {
  //   leaderboardEl.innerHTML = `${leaderboardEl.innerHTML}<li>${name}<span class="score">${score}</span></li>`;
  //   console.log("Name: ", name);
  //   console.log("Score: ", score);
  // });
  animateIntro();
}

formEl.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  let newObject = {};
  Object.values(formEl).reduce((obj, field) => {
    obj[field.name] = field.value;
    // console.log(obj);
    newObject = obj;
    return obj;
  }, {});

  newObject = Object.fromEntries(
    Object.entries(newObject).filter(([_, v]) => v != null)
  );

  newObject = { ...newObject, score: score };
  console.log(newObject);
});
