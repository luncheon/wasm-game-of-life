import { Universe, UniverseCanvasDrawer } from '../pkg/wasm_game_of_life';
import { memory } from '../pkg/wasm_game_of_life_bg.wasm';

const controlPanel = document.body.appendChild(document.createElement('aside'));
controlPanel.style.position = 'fixed';
controlPanel.style.top = '16px';
controlPanel.style.right = '16px';
controlPanel.style.padding = '4px';
controlPanel.style.background = 'rgba(255,255,255,.8)';
controlPanel.style.whiteSpace = 'nowrap';
controlPanel.style.userSelect = 'none';

const CELL_SIZE = 3;
const BORDERED_CELL_SIZE = CELL_SIZE + 1;
const GRID_COLOR = [204, 204, 204] as const;
const DEAD_COLOR = [255, 255, 255] as const;
const ALIVE_COLOR = [0, 0, 0] as const;

const rgbFormat = ([r, g, b]: readonly [number, number, number]) => `rgb(${r},${g},${b})`;
const rgb32bit = ([r, g, b]: readonly [number, number, number]) => (255 << 24) + (b << 16) + (g << 8) + r;

const countFps = (() => {
  const fpsElement = controlPanel.appendChild(document.createElement('div'));
  fpsElement.style.float = 'right';
  fpsElement.style.color = 'hsl(150,100%,50%)';
  fpsElement.style.textShadow = '1px 1px 1px hsl(150,100%,20%)';
  fpsElement.style.fontVariantNumeric = 'tabular-nums';
  fpsElement.textContent = '0 fps';

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
  return { stop: () => animationRequestId !== undefined && cancelAnimationFrame(animationRequestId) };
};

const forEachCells = (universe: Universe, callback: (row: number, column: number, isAlive: unknown) => void, modifiedOnly?: boolean) => {
  const { row_count, column_count } = universe;
  const cells = new Uint8Array(memory.buffer, universe.cells_ptr, row_count * column_count);
  let index = 0;
  for (let row = 0; row < row_count; row++) {
    for (let column = 0; column < column_count; column++) {
      const cell = cells[index]!;
      if (!modifiedOnly || cell & 2) {
        callback(row, column, cell & 1);
      }
      index++;
    }
  }
};

const drawGrid = (ctx: CanvasRenderingContext2D) => {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = new Int32Array(imageData.data.buffer);
  const color = rgb32bit(GRID_COLOR);
  // vertical
  for (let x = 0; x < ctx.canvas.width; x += BORDERED_CELL_SIZE) {
    for (let y = 0; y < ctx.canvas.height; y++) {
      data[y * ctx.canvas.width + x] = color;
    }
  }
  // horizontal
  for (let y = 0; y < ctx.canvas.height; y += BORDERED_CELL_SIZE) {
    for (let x = 0; x < ctx.canvas.width; x++) {
      data[y * ctx.canvas.width + x] = color;
    }
  }
  ctx.putImageData(imageData, 0, 0);
};

const canvasApiRenderer = (canvas: HTMLCanvasElement, universe: Universe) => {
  canvas.width = BORDERED_CELL_SIZE * universe.column_count + 1;
  canvas.height = BORDERED_CELL_SIZE * universe.row_count + 1;

  const ctx = canvas.getContext('2d')!;
  drawGrid(ctx);

  const deadColor = rgbFormat(DEAD_COLOR);
  const aliveColor = rgbFormat(ALIVE_COLOR);
  const drawCell = (row: number, column: number, isAlive: unknown) => {
    ctx.fillStyle = isAlive ? aliveColor : deadColor;
    ctx.fillRect(column * BORDERED_CELL_SIZE + 1, row * BORDERED_CELL_SIZE + 1, CELL_SIZE, CELL_SIZE);
  };

  forEachCells(universe, drawCell);
  return () => forEachCells(universe, drawCell, true);
};

const putImageDataRenderer = (canvas: HTMLCanvasElement, universe: Universe) => {
  canvas.width = BORDERED_CELL_SIZE * universe.column_count + 1;
  canvas.height = BORDERED_CELL_SIZE * universe.row_count + 1;

  const ctx = canvas.getContext('2d')!;
  drawGrid(ctx);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = new Int32Array(imageData.data.buffer);

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
  const drawCell = (row: number, column: number, isAlive: unknown) => {
    fillRect(column * BORDERED_CELL_SIZE + 1, row * BORDERED_CELL_SIZE + 1, CELL_SIZE, CELL_SIZE, isAlive ? aliveColor : deadColor);
  };

  forEachCells(universe, drawCell);
  ctx.putImageData(imageData, 0, 0);
  return () => {
    forEachCells(universe, drawCell, true);
    ctx.putImageData(imageData, 0, 0);
  };
};

const wasmRenderer = (canvas: HTMLCanvasElement, universe: Universe) => {
  const drawer = new UniverseCanvasDrawer(universe.as_ptr, CELL_SIZE, rgb32bit(GRID_COLOR), rgb32bit(DEAD_COLOR), rgb32bit(ALIVE_COLOR));
  const imageData = new ImageData(
    new Uint8ClampedArray(memory.buffer, drawer.data_ptr, drawer.width * drawer.height * 4),
    drawer.width,
    drawer.height,
  );

  canvas.width = drawer.width;
  canvas.height = drawer.height;
  const ctx = canvas.getContext('2d')!;

  drawer.draw_cells(false);
  ctx.putImageData(imageData, 0, 0);
  return () => {
    drawer.draw_cells(false);
    ctx.putImageData(imageData, 0, 0);
  };
};

{
  let canvas = document.body.appendChild(document.createElement('canvas'));
  let universe = new Universe(200, 200);
  universe.random();

  const clampRow = (value: number) => Math.min(Math.floor(value), universe.row_count - 1);
  const clampColumn = (value: number) => Math.min(Math.floor(value), universe.column_count - 1);
  const universeRowColumnFromClientXY = (clientX: number, clientY: number) => {
    const clientRect = canvas.getBoundingClientRect();
    const canvasX = ((clientX - clientRect.x - 1) * canvas.width) / clientRect.width;
    const canvasY = ((clientY - clientRect.y - 1) * canvas.height) / clientRect.height;
    return [clampRow(canvasY / (CELL_SIZE + 1)), clampColumn(canvasX / (CELL_SIZE + 1))] as const;
  };
  addEventListener('pointerdown', (event) => {
    if (event.target === canvas) {
      let [row, column] = universeRowColumnFromClientXY(event.clientX, event.clientY);
      universe.set_cell_alive(row, column, true);
      render();

      const onPointerMove = (event: PointerEvent) => {
        const [newRow, newColumn] = universeRowColumnFromClientXY(event.clientX, event.clientY);
        const distance = Math.hypot(newRow - row, newColumn - column);
        const angle = Math.atan2(newRow - row, newColumn - column);
        const rowUnit = Math.sin(angle);
        const columnUnit = Math.cos(angle);
        for (let i = 0; i < distance; i++) {
          universe.set_cell_alive(clampRow(row + i * rowUnit), clampColumn(column + i * columnUnit), true);
        }
        universe.set_cell_alive(row, column, true);
        row = newRow;
        column = newColumn;
        render();
      };
      const onPointerUp = () => {
        removeEventListener('pointerup', onPointerUp);
        removeEventListener('pointercancel', onPointerUp);
        removeEventListener('pointermove', onPointerMove);
        play();
      };
      addEventListener('pointerup', onPointerUp);
      addEventListener('pointercancel', onPointerUp);
      addEventListener('pointermove', onPointerMove);
      stop();
    }
  });

  const replaceCanvas = () => {
    canvas.remove();
    canvas.width = 0;
    canvas.height = 0;
    canvas = document.body.appendChild(document.createElement('canvas'));
    canvas.style.cursor = 'crosshair';
    return canvas;
  };

  const controls = controlPanel.appendChild(document.createElement('div'));
  controls.innerHTML = `
    <fieldset>
      <legend style="padding:0 8px">Renderer</legend>
      <label style="cursor:pointer"><input type="radio" name="renderer">Stop</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="canvas-api">fillRect (JS)</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="image-data">putImageData (JS)</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="wasm" checked>putImageData (WASM)</label><br>
    </fieldset>
    <fieldset>
      <legend style="padding:0 8px">Vastness</legend>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="200" checked>200x200</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="400">400x400</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="600">600x600</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="800">800x800</label><br>
    </fieldset>
  `;
  controls.addEventListener('change', (e) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    stop();
    if (e.target.name === 'vastness') {
      const size = +e.target.value;
      universe = new Universe(size, size);
      universe.random();
    }
    play();
  });

  let render: () => void;
  let stop: () => void;
  const play = () => {
    switch ((controls.querySelector('[name=renderer]:checked') as HTMLInputElement).value) {
      case 'canvas-api':
        render = canvasApiRenderer(replaceCanvas(), universe);
        break;
      case 'image-data':
        render = putImageDataRenderer(replaceCanvas(), universe);
        break;
      case 'wasm':
        render = wasmRenderer(replaceCanvas(), universe);
        break;
      default:
        stop = () => {};
        return;
    }
    ({ stop } = renderLoop(() => {
      universe.tick();
      render();
    }));
  };
  play();
}
