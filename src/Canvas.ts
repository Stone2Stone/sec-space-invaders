const canvas = document.querySelector<HTMLCanvasElement>(
  "canvas"
) as HTMLCanvasElement;

// set canvas dimensions
canvas.width = 1024;
canvas.height = 576;

//get canvas space
const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

export { canvas, canvasContext };
