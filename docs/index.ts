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
  const { rowCount, columnCount } = universe;
  const cells = new Uint8Array(memory.buffer, universe.cellsPtr, rowCount * columnCount);
  let index = 0;
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
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
  canvas.width = BORDERED_CELL_SIZE * universe.columnCount + 1;
  canvas.height = BORDERED_CELL_SIZE * universe.rowCount + 1;

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
  canvas.width = BORDERED_CELL_SIZE * universe.columnCount + 1;
  canvas.height = BORDERED_CELL_SIZE * universe.rowCount + 1;

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
  const drawer = new UniverseCanvasDrawer(universe.asPtr, CELL_SIZE, rgb32bit(GRID_COLOR), rgb32bit(DEAD_COLOR), rgb32bit(ALIVE_COLOR));
  const imageData = new ImageData(
    new Uint8ClampedArray(memory.buffer, drawer.dataPtr, drawer.width * drawer.height * 4),
    drawer.width,
    drawer.height,
  );

  canvas.width = drawer.width;
  canvas.height = drawer.height;
  const ctx = canvas.getContext('2d')!;

  drawer.drawCells(false);
  ctx.putImageData(imageData, 0, 0);
  return () => {
    drawer.drawCells(false);
    ctx.putImageData(imageData, 0, 0);
  };
};

const raii = <T>(callback: (scoped: <Resource>(resource: Resource, dispose: (x: Resource) => void) => Resource) => T) => {
  const disposers: (() => void)[] = [];
  try {
    return callback((x, dispose) => (disposers.unshift(() => dispose(x)), x));
  } finally {
    disposers.forEach((dispose) => dispose());
  }
};

const webglProgram = (gl: WebGL2RenderingContext, vertexShaderSource: string, fragmentShaderSource: string) =>
  raii((scoped) => {
    const vertexShader = scoped(gl.createShader(gl.VERTEX_SHADER)!, (shader) => gl.deleteShader(shader));
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      throw Error('vertex shader compilation failure: ' + gl.getShaderInfoLog(vertexShader));
    }

    const fragmentShader = scoped(gl.createShader(gl.FRAGMENT_SHADER)!, (shader) => gl.deleteShader(shader));
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      throw Error('fragment shader compilation failure: ' + gl.getShaderInfoLog(fragmentShader));
    }

    const program = scoped(gl.createProgram()!, (program) => gl.deleteProgram(program));
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw Error('program link failure: ' + gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);
    return program;
  });

const webgl2Renderer = (canvas: HTMLCanvasElement, universe: Universe) => {
  const { columnCount, rowCount } = universe;
  canvas.width = BORDERED_CELL_SIZE * columnCount + 1;
  canvas.height = BORDERED_CELL_SIZE * rowCount + 1;

  // tag for syntax highlight
  const glsl = String.raw;

  const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true })!;
  gl.viewport(0, 0, canvas.width, canvas.height);

  // draw grid
  {
    const program = webglProgram(
      gl,
      glsl`#version 300 es
        uniform vec2 resolution;
        uniform float cellSize;
        uniform bool vertical;

        void main() {
          float p1 = float(gl_VertexID / 2) * (cellSize + 1.0) + 0.5;
          float p2 = gl_VertexID % 2 == 0 ? -1.0 : 1.0;
          gl_Position = vertical
            ? vec4(p1 / resolution.x * 2.0 - 1.0, p2, 0.0, 1.0)
            : vec4(p2, p1 / resolution.y * 2.0 - 1.0, 0.0, 1.0);
        }
      `,
      glsl`#version 300 es
        precision highp float;
        uniform vec4 gridColor;
        out vec4 outColor;

        void main() {
          outColor = gridColor;
        }
      `,
    );
    gl.uniform2f(gl.getUniformLocation(program, 'resolution'), canvas.width, canvas.height);
    gl.uniform1f(gl.getUniformLocation(program, 'cellSize'), CELL_SIZE);
    gl.uniform4f(gl.getUniformLocation(program, 'gridColor'), GRID_COLOR[0] / 256, GRID_COLOR[1] / 256, GRID_COLOR[2] / 256, 1);
    gl.uniform1ui(gl.getUniformLocation(program, 'vertical'), 1);
    gl.drawArrays(gl.LINES, 0, universe.columnCount * 2 + 2);
    gl.uniform1ui(gl.getUniformLocation(program, 'vertical'), 0);
    gl.drawArrays(gl.LINES, 0, universe.rowCount * 2 + 2);
  }

  const program = webglProgram(
    gl,
    glsl`#version 300 es
      precision highp usampler2D;
      uniform usampler2D cells;
      uniform vec2 resolution;
      uniform int columnCount;
      uniform int cellSize;
      uniform vec4 deadColor;
      uniform vec4 aliveColor;
      out vec4 cellColor;

      void main() {
        int cellIndex = gl_VertexID / 6;
        ivec2 cellPosition = ivec2(cellIndex % columnCount, cellIndex / columnCount);
        int vertexOffsetIndex = gl_VertexID % 6;
        ivec2 vertexPosition = cellPosition * (cellSize + 1) + 1 + ivec2(
          vertexOffsetIndex == 0 ? ivec2(0, 0) :
          vertexOffsetIndex == 1 || vertexOffsetIndex == 3 ? ivec2(cellSize, 0) :
          vertexOffsetIndex == 2 || vertexOffsetIndex == 4 ? ivec2(0, cellSize) :
          ivec2(cellSize, cellSize)
        );
        gl_Position = vec4((vec2(vertexPosition) / resolution) * 2.0 - 1.0, 0.0, 1.0);
        gl_Position.y = -gl_Position.y;

        uint cellState = texelFetch(cells, cellPosition, 0).x;
        cellColor = cellState == 1u || cellState == 3u ? aliveColor : deadColor;
      }
    `,
    glsl`#version 300 es
      precision highp float;
      in vec4 cellColor;
      out vec4 outColor;

      void main() {
        outColor = cellColor;
      }
    `,
  );

  gl.uniform2f(gl.getUniformLocation(program, 'resolution'), gl.canvas.width, gl.canvas.height);
  gl.uniform1i(gl.getUniformLocation(program, 'columnCount'), columnCount);
  gl.uniform1i(gl.getUniformLocation(program, 'cellSize'), CELL_SIZE);
  gl.uniform4f(gl.getUniformLocation(program, 'deadColor'), DEAD_COLOR[0] / 256, DEAD_COLOR[1] / 256, DEAD_COLOR[2] / 256, 1);
  gl.uniform4f(gl.getUniformLocation(program, 'aliveColor'), ALIVE_COLOR[0] / 256, ALIVE_COLOR[1] / 256, ALIVE_COLOR[2] / 256, 1);

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  const drawCells = () => {
    const cells = new Uint8Array(memory.buffer, universe.cellsPtr, rowCount * columnCount);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8UI, columnCount, rowCount, 0, gl.RED_INTEGER, gl.UNSIGNED_BYTE, cells);
    gl.drawArrays(gl.TRIANGLES, 0, rowCount * columnCount * 6);
  };
  drawCells();
  return drawCells;
};

{
  let canvas = document.body.appendChild(document.createElement('canvas'));
  let universe = new Universe(200, 200);
  universe.random();

  const clampRow = (value: number) => Math.min(Math.floor(value), universe.rowCount - 1);
  const clampColumn = (value: number) => Math.min(Math.floor(value), universe.columnCount - 1);
  const universeRowColumnFromClientXY = (clientX: number, clientY: number) => {
    const clientRect = canvas.getBoundingClientRect();
    const canvasX = ((clientX - clientRect.x - 1) * canvas.width) / clientRect.width;
    const canvasY = ((clientY - clientRect.y - 1) * canvas.height) / clientRect.height;
    return [clampRow(canvasY / (CELL_SIZE + 1)), clampColumn(canvasX / (CELL_SIZE + 1))] as const;
  };
  addEventListener('pointerdown', (event) => {
    if (event.target === canvas) {
      let [row, column] = universeRowColumnFromClientXY(event.clientX, event.clientY);
      universe.setCellAlive(row, column, true);
      render();

      const onPointerMove = (event: PointerEvent) => {
        const [newRow, newColumn] = universeRowColumnFromClientXY(event.clientX, event.clientY);
        const distance = Math.hypot(newRow - row, newColumn - column);
        const angle = Math.atan2(newRow - row, newColumn - column);
        const rowUnit = Math.sin(angle);
        const columnUnit = Math.cos(angle);
        for (let i = 0; i < distance; i++) {
          universe.setCellAlive(clampRow(row + i * rowUnit), clampColumn(column + i * columnUnit), true);
        }
        universe.setCellAlive(row, column, true);
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

  const controls = controlPanel.appendChild(document.createElement('div'));
  controls.innerHTML = `
    <fieldset>
      <legend style="padding:0 8px">Renderer</legend>
      <label style="cursor:pointer"><input type="radio" name="renderer">Stop</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="canvas-api">fillRect (JS)</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="image-data">putImageData (JS)</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="wasm">putImageData (WASM)</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="webgl2" checked>WebGL2</label><br>
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

  const replaceCanvas = () => {
    canvas.remove();
    canvas.width = 0;
    canvas.height = 0;
    canvas = document.body.appendChild(document.createElement('canvas'));
    canvas.style.cursor = 'crosshair';
    return canvas;
  };
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
      case 'webgl2':
        render = webgl2Renderer(replaceCanvas(), universe);
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
