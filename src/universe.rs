use super::js;
use super::table::Table;
use wasm_bindgen::prelude::*;

use cell_state::CellState;
mod cell_state {
    const DEAD: u8 = 0x00;
    const ALIVE: u8 = 0x01;
    const MODIFIED: u8 = 0x02;

    #[derive(Copy, Clone)]
    pub struct CellState(u8);

    impl CellState {
        pub fn is_alive(&self) -> bool {
            self.0 & ALIVE == ALIVE
        }

        pub fn is_modified(&self) -> bool {
            self.0 & MODIFIED == MODIFIED
        }
    }

    pub const STAY_DEAD: CellState = CellState(DEAD);
    pub const SURVIVAL: CellState = CellState(ALIVE);
    pub const DEATH: CellState = CellState(MODIFIED | DEAD);
    pub const BIRTH: CellState = CellState(MODIFIED | ALIVE);
}

fn random_state() -> CellState {
    static mut X: Option<u32> = None;
    let mut y = unsafe { X.unwrap_or_else(|| js::Date::now() as u64 as u32) };
    y = y ^ (y << 13);
    y = y ^ (y >> 17);
    y = y ^ (y << 5);
    unsafe {
        X = Some(y);
    }
    if (y & 1) == 1 {
        cell_state::BIRTH
    } else {
        cell_state::DEATH
    }
}

#[wasm_bindgen]
pub struct Universe {
    cells: Table<CellState>,
    inactive_cells: Table<CellState>,
}

impl Universe {
    pub fn cell(&self, row: usize, column: usize) -> CellState {
        self.cells.get(row, column)
    }
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new(width: usize, height: usize) -> Self {
        Universe {
            cells: Table::with_fill(height, width, cell_state::DEATH),
            inactive_cells: Table::with_fill(height, width, cell_state::DEATH),
        }
    }

    pub fn random(&mut self) {
        self.cells = Table::generate(self.cells.row_count(), self.cells.column_count(), |_| random_state());
    }

    pub fn single_space_ship(&mut self, row: usize, column: usize) {
        for (row_offset, column_offset, cell) in [
            (0, 0, cell_state::DEATH),
            (0, 1, cell_state::BIRTH),
            (0, 2, cell_state::DEATH),
            (0, 3, cell_state::DEATH),
            (0, 4, cell_state::BIRTH),
            (1, 0, cell_state::BIRTH),
            (1, 1, cell_state::DEATH),
            (1, 2, cell_state::DEATH),
            (1, 3, cell_state::DEATH),
            (1, 4, cell_state::DEATH),
            (2, 0, cell_state::BIRTH),
            (2, 1, cell_state::DEATH),
            (2, 2, cell_state::DEATH),
            (2, 3, cell_state::DEATH),
            (2, 4, cell_state::BIRTH),
            (3, 0, cell_state::BIRTH),
            (3, 1, cell_state::BIRTH),
            (3, 2, cell_state::BIRTH),
            (3, 3, cell_state::BIRTH),
            (3, 4, cell_state::DEATH),
        ] {
            self.cells.set(row + row_offset, column + column_offset, cell);
        }
    }

    #[wasm_bindgen(getter)]
    pub fn as_ptr(&self) -> *const Universe {
        self
    }

    #[wasm_bindgen(getter)]
    pub fn cells_ptr(&self) -> *const CellState {
        self.cells.as_ptr()
    }

    #[wasm_bindgen(getter)]
    pub fn row_count(&self) -> usize {
        self.cells.row_count()
    }

    #[wasm_bindgen(getter)]
    pub fn column_count(&self) -> usize {
        self.cells.column_count()
    }

    fn live_neighbor_count(&self, row: usize, column: usize) -> usize {
        let rows = self.cells.row_count();
        let columns = self.cells.column_count();
        let row1 = if row == 0 { rows - 1 } else { row - 1 };
        let row2 = if row == rows - 1 { 0 } else { row + 1 };
        let column1 = if column == 0 { columns - 1 } else { column - 1 };
        let column2 = if column == columns - 1 { 0 } else { column + 1 };

        self.cells.get(row1, column1).is_alive() as usize
            + self.cells.get(row1, column).is_alive() as usize
            + self.cells.get(row1, column2).is_alive() as usize
            + self.cells.get(row, column1).is_alive() as usize
            + self.cells.get(row, column2).is_alive() as usize
            + self.cells.get(row2, column1).is_alive() as usize
            + self.cells.get(row2, column).is_alive() as usize
            + self.cells.get(row2, column2).is_alive() as usize
    }

    pub fn tick(&mut self) {
        for row in 0..self.cells.row_count() {
            for column in 0..self.cells.column_count() {
                let cell = self.cells.get(row, column).is_alive();
                let live_neighbors = self.live_neighbor_count(row, column);
                let next_cell = match (cell, live_neighbors) {
                    // Rule 1: Any live cell with fewer than two live neighbors
                    // dies, as if caused by underpopulation.
                    (true, x) if x < 2 => cell_state::DEATH,
                    // Rule 2: Any live cell with two or three live neighbors
                    // lives on to the next generation.
                    (true, 2) | (true, 3) => cell_state::SURVIVAL,
                    // Rule 3: Any live cell with more than three live
                    // neighbors dies, as if by overpopulation.
                    (true, _) => cell_state::DEATH,
                    // Rule 4: Any dead cell with exactly three live neighbors
                    // becomes a live cell, as if by reproduction.
                    (false, 3) => cell_state::BIRTH,
                    // All other cells remain in the same state.
                    _ => cell_state::STAY_DEAD,
                };
                self.inactive_cells.set(row, column, next_cell);
            }
        }
        std::mem::swap(&mut self.cells, &mut self.inactive_cells);
    }
}
