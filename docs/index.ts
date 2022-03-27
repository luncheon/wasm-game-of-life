import { Universe, UniverseCanvasDrawer } from '../pkg/wasm_game_of_life';
import { memory } from '../pkg/wasm_game_of_life_bg.wasm';

const CELL_SIZE = 4;
const GRID_COLOR = [204, 204, 204] as const;
const DEAD_COLOR = [255, 255, 255] as const;
const ALIVE_COLOR = [0, 0, 0] as const;

const universe = new Universe(Math.floor(innerWidth / (CELL_SIZE + 1)) - 1, Math.floor(innerHeight / (CELL_SIZE + 1)) - 1);
universe.random();

const rgbFormat = (r: number, g: number, b: number) => `rgb(${r},${g},${b})`;
const rgb32bit = (r: number, g: number, b: number) => (255 << 24) + (b << 16) + (g << 8) + r;

const renderLoop = (callback: () => void) => {
  const fpsElement = document.body.appendChild(document.createElement('div'));
  fpsElement.style.position = 'fixed';
  fpsElement.style.right = '8px';
  fpsElement.style.top = '8px';
  fpsElement.style.color = 'hsl(150,100%,50%)';
  fpsElement.style.textShadow = '1px 1px 1px hsl(150,100%,20%)';

  let currentCallbackCount = 0;
  let previousTimestamp = performance.now();

  setInterval(() => {
    const timestamp = performance.now();
    fpsElement.textContent = `${Math.round((currentCallbackCount * 1000) / (timestamp - previousTimestamp))} fps`;
    currentCallbackCount = 0;
    previousTimestamp = timestamp;
  }, 512);

  const wrappedCallback = () => {
    callback();
    currentCallbackCount++;
    requestAnimationFrame(wrappedCallback);
  };
  wrappedCallback();
};

const renderUniverseToText = () => {
  const pre = document.body.appendChild(document.createElement('pre'));
  pre.style.fontSize = '10px';
  pre.style.lineHeight = '1';
  renderLoop(() => {
    pre.textContent = universe.to_string();
    universe.tick();
  });
};

const renderUniverseToCanvasByJsApi = () => {
  const canvas = document.body.appendChild(document.createElement('canvas'));
  const ctx = canvas.getContext('2d')!;
  const gridColor = rgbFormat(...GRID_COLOR);
  const deadColor = rgbFormat(...DEAD_COLOR);
  const aliveColor = rgbFormat(...ALIVE_COLOR);

  canvas.width = (CELL_SIZE + 1) * universe.width + 1;
  canvas.height = (CELL_SIZE + 1) * universe.height + 1;

  const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = gridColor;

    // Vertical lines.
    for (let i = 0; i <= universe.width; i++) {
      ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      ctx.lineTo(i * (CELL_SIZE + 1) + 1, canvas.height);
    }

    // Horizontal lines.
    for (let j = 0; j <= universe.height; j++) {
      ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
      ctx.lineTo(canvas.width, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
  };

  const getIndex = (row: number, column: number) => row * universe.width + column;

  const drawCells = () => {
    const cells = new Uint8Array(memory.buffer, universe.cells_ptr, universe.width * universe.height);

    ctx.beginPath();

    for (let row = 0; row < universe.height; row++) {
      for (let column = 0; column < universe.width; column++) {
        const index = getIndex(row, column);
        ctx.fillStyle = cells[index] ? aliveColor : deadColor;
        ctx.fillRect(column * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
      }
    }

    ctx.stroke();
  };

  drawGrid();
  renderLoop(() => {
    drawCells();
    universe.tick();
  });
};

const renderUniverseToCanvasByJs = () => {
  const canvas = document.body.appendChild(document.createElement('canvas'));
  const ctx = canvas.getContext('2d')!;
  const gridColor = rgbFormat(...GRID_COLOR);
  const deadColor = rgb32bit(...DEAD_COLOR);
  const aliveColor = rgb32bit(...ALIVE_COLOR);

  const BORDERED_CELL_SIZE = CELL_SIZE + 1;
  canvas.width = universe.width * BORDERED_CELL_SIZE + 1;
  canvas.height = universe.height * BORDERED_CELL_SIZE + 1;

  const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = gridColor;

    // Vertical lines.
    for (let i = 0; i <= universe.width; i++) {
      ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      ctx.lineTo(i * (CELL_SIZE + 1) + 1, canvas.height);
    }

    // Horizontal lines.
    for (let j = 0; j <= universe.height; j++) {
      ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
      ctx.lineTo(canvas.width, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
  };
  drawGrid();
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = new Uint32Array(imageData.data.buffer);

  const getIndex = (row: number, column: number) => row * universe.width + column;
  const fillRect = (x: number, y: number, w: number, h: number, color: number) => {
    let indexY = y * canvas.width;
    for (let offsetY = 0; offsetY < h; offsetY++) {
      for (let offsetX = 0; offsetX < w; offsetX++) {
        data[x + offsetX + indexY] = color;
      }
      indexY += canvas.width;
    }
  };
  const drawCells = () => {
    const cells = new Uint8Array(memory.buffer, universe.cells_ptr, universe.width * universe.height);
    for (let row = 0; row < universe.height; row++) {
      for (let column = 0; column < universe.width; column++) {
        const index = getIndex(row, column);
        const color = cells[index] ? aliveColor : deadColor;
        fillRect(column * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE, color);
      }
    }
  };

  drawCells();
  renderLoop(() => {
    ctx.putImageData(imageData, 0, 0);
    universe.tick();
    drawCells();
  });
};

const renderUniverseToCanvasByWasm = () => {
  const canvas = document.body.appendChild(document.createElement('canvas'));
  const ctx = canvas.getContext('2d')!;
  const gridColor = rgb32bit(...GRID_COLOR);
  const deadColor = rgb32bit(...DEAD_COLOR);
  const aliveColor = rgb32bit(...ALIVE_COLOR);
  const drawer = new UniverseCanvasDrawer(universe.as_ptr, CELL_SIZE, gridColor, deadColor, aliveColor);
  const data = new ImageData(
    new Uint8ClampedArray(memory.buffer, drawer.data_ptr, drawer.width * drawer.height * 4),
    drawer.width,
    drawer.height,
  );
  canvas.width = drawer.width;
  canvas.height = drawer.height;

  drawer.draw();
  renderLoop(() => {
    ctx.putImageData(data, 0, 0);
    universe.tick();
    drawer.draw();
  });
};

renderUniverseToCanvasByWasm();
