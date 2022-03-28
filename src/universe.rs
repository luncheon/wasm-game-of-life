use super::bit_table::BitTable;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Universe {
    cells: BitTable,
    inactive_cells: BitTable,
}

impl Universe {
    pub fn cell(&self, row: u32, column: u32) -> bool {
        self.cells.get(row, column)
    }
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new(width: u32, height: u32) -> Self {
        Universe {
            cells: BitTable::falsities(height, width),
            inactive_cells: BitTable::falsities(height, width),
        }
    }

    pub fn random(&mut self) {
        self.cells = BitTable::randoms(self.cells.row_count(), self.cells.column_count());
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
            self.cells
                .set(row + row_offset, column + column_offset, cell);
        }
    }

    #[wasm_bindgen(getter)]
    pub fn as_ptr(&self) -> *const Universe {
        self
    }

    #[wasm_bindgen(getter)]
    pub fn cells_ptr(&self) -> *const u8 {
        self.cells.as_ptr()
    }

    #[wasm_bindgen(getter)]
    pub fn row_count(&self) -> u32 {
        self.cells.row_count()
    }

    #[wasm_bindgen(getter)]
    pub fn column_count(&self) -> u32 {
        self.cells.column_count()
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u32 {
        let rows = self.cells.row_count();
        let columns = self.cells.column_count();
        let row1 = if row == 0 { rows - 1 } else { row - 1 };
        let row2 = if row == rows - 1 { 0 } else { row + 1 };
        let column1 = if column == 0 { columns - 1 } else { column - 1 };
        let column2 = if column == columns - 1 { 0 } else { column + 1 };

        self.cells.get(row1, column1) as u32
            + self.cells.get(row1, column) as u32
            + self.cells.get(row1, column2) as u32
            + self.cells.get(row, column1) as u32
            + self.cells.get(row, column2) as u32
            + self.cells.get(row2, column1) as u32
            + self.cells.get(row2, column) as u32
            + self.cells.get(row2, column2) as u32
    }

    pub fn tick(&mut self) {
        for row in 0..self.cells.row_count() {
            for column in 0..self.cells.column_count() {
                let cell = self.cells.get(row, column);
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
                self.inactive_cells.set(row, column, next_cell);
            }
        }
        std::mem::swap(&mut self.cells, &mut self.inactive_cells);
    }
}
