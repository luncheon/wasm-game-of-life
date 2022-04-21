use super::canvas::Canvas;
use super::universe::Universe;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct UniverseCanvasDrawer {
    universe_ptr: *const Universe,
    width: usize,
    height: usize,
    cell_size: usize,
    bordered_cell_size: usize,
    grid_color: u32,
    dead_color: u32,
    alive_color: u32,
    canvas: Canvas,
}

#[wasm_bindgen]
impl UniverseCanvasDrawer {
    #[wasm_bindgen(constructor)]
    pub fn new(universe_ptr: *const Universe, cell_size: usize, grid_color: u32, dead_color: u32, alive_color: u32) -> Self {
        let universe = unsafe { &*universe_ptr };
        let bordered_cell_size = cell_size + 1;
        let width = universe.column_count() * bordered_cell_size + 1;
        let height = universe.row_count() * bordered_cell_size + 1;
        let mut drawer = Self {
            universe_ptr,
            width,
            height,
            cell_size,
            bordered_cell_size,
            grid_color,
            dead_color,
            alive_color,
            canvas: Canvas::new(width, height),
        };
        drawer.draw_grid();
        drawer
    }

    #[wasm_bindgen(getter)]
    pub fn width(&self) -> usize {
        self.width
    }

    #[wasm_bindgen(getter)]
    pub fn height(&self) -> usize {
        self.height
    }

    #[wasm_bindgen(getter, js_name = "dataPtr")]
    pub fn data_ptr(&self) -> *const u32 {
        self.canvas.data().as_ptr()
    }

    fn draw_grid(&mut self) {
        let canvas = &mut self.canvas;
        for x in (0..canvas.width()).step_by(self.bordered_cell_size) {
            canvas.draw_line_vertical(x, 0, canvas.height() - 1, self.grid_color);
        }
        for y in (0..canvas.height()).step_by(self.bordered_cell_size) {
            canvas.draw_line_horizontal(y, 0, canvas.width() - 1, self.grid_color);
        }
    }

    #[wasm_bindgen(js_name = "drawCells")]
    pub fn draw_cells(&mut self, modified_only: bool) {
        let universe = unsafe { &*self.universe_ptr };
        let mut x = 1;
        let mut y = 1;
        for row in 0..universe.row_count() {
            for column in 0..universe.column_count() {
                let cell = universe.cell(row, column);
                if !modified_only || cell.is_modified() {
                    let color = if cell.is_alive() { self.alive_color } else { self.dead_color };
                    self.canvas.fill_rect(x, y, self.cell_size, self.cell_size, color);
                }
                x += self.bordered_cell_size;
            }
            x = 1;
            y += self.bordered_cell_size;
        }
    }
}
