import { Universe, UniverseCanvasDrawer } from '../pkg/wasm_game_of_life';
import { memory } from '../pkg/wasm_game_of_life_bg.wasm';

const canvas = document.body.appendChild(document.createElement('canvas'));

const CELL_SIZE = 4;
const GRID_COLOR = [204, 204, 204] as const;
const DEAD_COLOR = [255, 255, 255] as const;
const ALIVE_COLOR = [0, 0, 0] as const;

const universe = new Universe(Math.floor(innerWidth / (CELL_SIZE + 1)) - 1, Math.floor(innerHeight / (CELL_SIZE + 1)) - 1);
universe.random();

const rgbFormat = ([r, g, b]: readonly [number, number, number]) => `rgb(${r},${g},${b})`;
const rgb32bit = ([r, g, b]: readonly [number, number, number]) => (255 << 24) + (b << 16) + (g << 8) + r;

const countFps = (() => {
  const fpsElement = document.body.appendChild(document.createElement('div'));
  fpsElement.style.position = 'fixed';
  fpsElement.style.right = '8px';
  fpsElement.style.top = '8px';
  fpsElement.style.color = 'hsl(150,100%,50%)';
  fpsElement.style.textShadow = '1px 1px 1px hsl(150,100%,20%)';
  fpsElement.style.fontVariantNumeric = 'tabular-nums';

  let currentCallbackCount = 0;
  let previousTimestamp = performance.now();

  setInterval(() => {
    const timestamp = performance.now();
    fpsElement.textContent = `${Math.round((currentCallbackCount * 1000) / (timestamp - previousTimestamp))} fps`;
    currentCallbackCount = 0;
    previousTimestamp = timestamp;
  }, 512);

  return () => currentCallbackCount++;
})();

const renderLoop = (callback: () => void) => {
  let animationRequestId: number | undefined;
  const wrappedCallback = () => {
    callback();
    countFps();
    animationRequestId = requestAnimationFrame(wrappedCallback);
  };
  wrappedCallback();
  return { cancel: () => animationRequestId !== undefined && cancelAnimationFrame(animationRequestId) };
};

const forEachCells = (callback: (row: number, column: number, isAlive: boolean) => void) => {
  const cells = new Uint8Array(memory.buffer, universe.cells_ptr, Math.ceil((universe.row_count * universe.column_count) / 8));
  let byteIndex = 0;
  let bitMask = 1;
  for (let row = 0; row < universe.row_count; row++) {
    for (let column = 0; column < universe.column_count; column++) {
      callback(row, column, (cells[byteIndex]! & bitMask) === bitMask);
      if (bitMask === 1 << 7) {
        bitMask = 1;
        byteIndex++;
      } else {
        bitMask <<= 1;
      }
    }
  }
};

const drawGrid = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.strokeStyle = rgbFormat(GRID_COLOR);

  // Vertical lines.
  for (let i = 0; i <= universe.column_count; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, ctx.canvas.height);
  }

  // Horizontal lines.
  for (let j = 0; j <= universe.row_count; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo(ctx.canvas.width, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

const renderLoopByCanvasApi = () => {
  canvas.width = (CELL_SIZE + 1) * universe.column_count + 1;
  canvas.height = (CELL_SIZE + 1) * universe.row_count + 1;

  const ctx = canvas.getContext('2d')!;
  drawGrid(ctx);

  const deadColor = rgbFormat(DEAD_COLOR);
  const aliveColor = rgbFormat(ALIVE_COLOR);
  const drawCells = () => {
    forEachCells((row, column, isAlive) => {
      ctx.fillStyle = isAlive ? aliveColor : deadColor;
      ctx.fillRect(column * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
    });
  };

  return renderLoop(() => {
    drawCells();
    universe.tick();
  });
};

const renderLoopByImageData = () => {
  canvas.width = (CELL_SIZE + 1) * universe.column_count + 1;
  canvas.height = (CELL_SIZE + 1) * universe.row_count + 1;

  const ctx = canvas.getContext('2d')!;
  drawGrid(ctx);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = new Uint32Array(imageData.data.buffer);

  const fillRect = (x: number, y: number, w: number, h: number, color: number) => {
    let baseIndex = x + y * canvas.width;
    for (let yi = 0; yi < h; yi++) {
      for (let xi = 0; xi < w; xi++) {
        data[baseIndex + xi] = color;
      }
      baseIndex += canvas.width;
    }
  };

  const deadColor = rgb32bit(DEAD_COLOR);
  const aliveColor = rgb32bit(ALIVE_COLOR);
  const drawCells = () => {
    forEachCells((row, column, isAlive) => {
      const color = isAlive ? aliveColor : deadColor;
      fillRect(column * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE, color);
    });
    ctx.putImageData(imageData, 0, 0);
  };

  return renderLoop(() => {
    drawCells();
    universe.tick();
  });
};

const renderLoopByWasm = () => {
  const drawer = new UniverseCanvasDrawer(universe.as_ptr, CELL_SIZE, rgb32bit(GRID_COLOR), rgb32bit(DEAD_COLOR), rgb32bit(ALIVE_COLOR));
  const imageData = new ImageData(
    new Uint8ClampedArray(memory.buffer, drawer.data_ptr, drawer.width * drawer.height * 4),
    drawer.width,
    drawer.height,
  );

  canvas.width = drawer.width;
  canvas.height = drawer.height;
  const ctx = canvas.getContext('2d')!;

  return renderLoop(() => {
    drawer.draw();
    ctx.putImageData(imageData, 0, 0);
    universe.tick();
  });
};

renderLoopByWasm();
