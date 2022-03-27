use super::js;
use wasm_bindgen::prelude::*;

fn random_bool() -> bool {
    static mut X: Option<u32> = None;
    let mut y = unsafe { X.unwrap_or_else(|| js::Date::now() as u64 as u32) };
    y = y ^ (y << 13);
    y = y ^ (y >> 17);
    y = y ^ (y << 5);
    unsafe {
        X = Some(y);
    }
    y & 1 == 1
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<bool>,
    inactive_cells: Vec<bool>,
}

impl Universe {
    pub fn cells(&self) -> &Vec<bool> {
        &self.cells
    }
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new(width: u32, height: u32) -> Self {
        let size = (width * height) as usize;
        Universe {
            width,
            height,
            cells: vec![false; size],
            inactive_cells: vec![false; size],
        }
    }

    pub fn random(&mut self) {
        self.cells = (0..(self.width * self.height))
            .map(|_| random_bool())
            .collect();
    }

    pub fn single_space_ship(&mut self, row: u32, column: u32) {
        for (row_offset, column_offset, cell) in [
            (0, 0, false),
            (0, 1, true),
            (0, 2, false),
            (0, 3, false),
            (0, 4, true),
            (1, 0, true),
            (1, 1, false),
            (1, 2, false),
            (1, 3, false),
            (1, 4, false),
            (2, 0, true),
            (2, 1, false),
            (2, 2, false),
            (2, 3, false),
            (2, 4, true),
            (3, 0, true),
            (3, 1, true),
            (3, 2, true),
            (3, 3, true),
            (3, 4, false),
        ] {
            let index = self.get_index(row + row_offset, column + column_offset);
            self.cells[index] = cell;
        }
    }

    #[wasm_bindgen(getter)]
    pub fn as_ptr(&self) -> *const Universe {
        self
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
    pub fn cells_ptr(&self) -> *const bool {
        self.cells.as_ptr()
    }

    pub fn to_string(&self) -> String {
        self.cells
            .as_slice()
            .chunks(self.width as usize)
            .flat_map(|line| {
                (*line)
                    .iter()
                    .map(|cell| if *cell { '◼' } else { '◻' })
                    .chain(std::iter::once('\n'))
            })
            .collect()
    }

    fn get_index(&self, row: u32, column: u32) -> usize {
        let row = (row + self.height) % self.height;
        let column = (column + self.width) % self.width;
        (row * self.width + column) as usize
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u32 {
        [
            (-1, -1),
            (-1, 0),
            (-1, 1),
            (0, -1),
            (0, 1),
            (1, -1),
            (1, 0),
            (1, 1),
        ]
        .iter()
        .filter(|(row_offset, column_offset)| {
            self.cells[self.get_index(row + *row_offset as u32, column + *column_offset as u32)]
        })
        .count() as u32
    }

    pub fn tick(&mut self) {
        let mut index = 0;
        for row in 0..self.height {
            for column in 0..self.width {
                let cell = self.cells[index];
                let live_neighbors = self.live_neighbor_count(row, column);
                let next_cell = match (cell, live_neighbors) {
                    // Rule 1: Any live cell with fewer than two live neighbors
                    // dies, as if caused by underpopulation.
                    (true, x) if x < 2 => false,
                    // Rule 2: Any live cell with two or three live neighbors
                    // lives on to the next generation.
                    (true, 2) | (true, 3) => true,
                    // Rule 3: Any live cell with more than three live
                    // neighbors dies, as if by overpopulation.
                    (true, x) if x > 3 => false,
                    // Rule 4: Any dead cell with exactly three live neighbors
                    // becomes a live cell, as if by reproduction.
                    (false, 3) => true,
                    // All other cells remain in the same state.
                    (otherwise, _) => otherwise,
                };
                self.inactive_cells[index] = next_cell;
                index += 1;
            }
        }
        std::mem::swap(&mut self.cells, &mut self.inactive_cells);
    }
}
