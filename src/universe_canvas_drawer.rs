use super::canvas::Canvas;
use super::universe::Universe;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct UniverseCanvasDrawer {
    universe_ptr: *const Universe,
    width: u32,
    height: u32,
    cell_size: u32,
    bordered_cell_size: u32,
    grid_color: u32,
    dead_color: u32,
    alive_color: u32,
    canvas: Canvas,
}

#[wasm_bindgen]
impl UniverseCanvasDrawer {
    #[wasm_bindgen(constructor)]
    pub fn new(
        universe_ptr: *const Universe,
        cell_size: u32,
        grid_color: u32,
        dead_color: u32,
        alive_color: u32,
    ) -> Self {
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
    pub fn width(&self) -> u32 {
        self.width
    }

    #[wasm_bindgen(getter)]
    pub fn height(&self) -> u32 {
        self.height
    }

    #[wasm_bindgen(getter)]
    pub fn data_ptr(&self) -> *const u32 {
        self.canvas.data().as_ptr()
    }

    pub fn draw(&mut self) {
        self.draw_cells();
    }

    fn draw_grid(&mut self) {
        let canvas = &mut self.canvas;
        for x in (0..canvas.width()).step_by(self.bordered_cell_size as usize) {
            canvas.draw_line_vertical(x, 0, canvas.height() - 1, self.grid_color);
        }
        for y in (0..canvas.height()).step_by(self.bordered_cell_size as usize) {
            canvas.draw_line_horizontal(y, 0, canvas.width() - 1, self.grid_color);
        }
    }

    fn draw_cells(&mut self) {
        let universe = unsafe { &*self.universe_ptr };
        let mut x = 1;
        let mut y = 1;
        for row in 0..universe.row_count() {
            for column in 0..universe.column_count() {
                let color = if universe.cell(row, column) {
                    self.alive_color
                } else {
                    self.dead_color
                };
                if self.canvas.pixel_color(x, y) != color {
                    self.canvas
                        .fill_rect(x, y, self.cell_size, self.cell_size, color);
                }
                x += self.bordered_cell_size;
            }
            x = 1;
            y += self.bordered_cell_size;
        }
    }
}
