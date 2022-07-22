import './style.css';

import Player from './Player';
import { canvas } from './selectors';

const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

// set canvas dimensions
canvas.width = innerWidth;
canvas.height = innerHeight;

//instantiate Player
let player = new Player(canvasContext);
player.draw();
