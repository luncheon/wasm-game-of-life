use super::js;
use super::table::Table;
use super::utils;
use wasm_bindgen::prelude::*;

use cell_state::CellState;
mod cell_state {
    const DEAD: u8 = 0x00;
    const ALIVE: u8 = 0x01;
    const MODIFIED: u8 = 0x02;

    #[derive(Copy, Clone, PartialEq, Eq, Debug)]
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
        utils::set_panic_hook();

        Universe {
            cells: Table::with_fill(height, width, cell_state::DEATH),
            inactive_cells: Table::with_fill(height, width, cell_state::DEATH),
        }
    }

    pub fn random(&mut self) {
        self.cells = Table::generate(self.cells.row_count(), self.cells.column_count(), |_| random_state());
    }

    #[wasm_bindgen(getter, js_name = "asPtr")]
    pub fn as_ptr(&self) -> *const Universe {
        self
    }

    #[wasm_bindgen(getter, js_name = "cellsPtr")]
    pub fn cells_ptr(&self) -> *const CellState {
        self.cells.as_ptr()
    }

    #[wasm_bindgen(getter, js_name = "rowCount")]
    pub fn row_count(&self) -> usize {
        self.cells.row_count()
    }

    #[wasm_bindgen(getter, js_name = "columnCount")]
    pub fn column_count(&self) -> usize {
        self.cells.column_count()
    }

    #[wasm_bindgen(js_name = "setCellAlive")]
    pub fn set_cell_alive(&mut self, row: usize, column: usize, is_alive: bool) {
        self.cells
            .set(row, column, if is_alive { cell_state::BIRTH } else { cell_state::DEATH })
    }

    pub fn tick(&mut self) {
        let next_cell_state = |is_alive: usize, live_neighbors: usize| match (is_alive, live_neighbors) {
            (0, 3) => cell_state::BIRTH,
            (0, _) => cell_state::STAY_DEAD,
            (1, 2) | (1, 3) => cell_state::SURVIVAL,
            _ => cell_state::DEATH,
        };
        let is_alive = |row: usize, column: usize| self.cells.get(row, column).is_alive() as usize;
        let column_last = self.cells.column_count() - 1;
        for row in 0..self.cells.row_count() {
            let row_above = if row == 0 { self.cells.row_count() - 1 } else { row - 1 };
            let row_below = if row == self.cells.row_count() - 1 { 0 } else { row + 1 };

            let mut living_left_triplet = is_alive(row_above, column_last) + is_alive(row, column_last) + is_alive(row_below, column_last);
            let mut living_above_and_below = is_alive(row_above, 0) + is_alive(row_below, 0);
            let mut living_self = is_alive(row, 0);
            for column in 0..self.cells.column_count() {
                let column_right = if column == column_last { 0 } else { column + 1 };
                let living_right = is_alive(row, column_right);
                let living_right_above_and_below = is_alive(row_above, column_right) + is_alive(row_below, column_right);
                let living_neighbors = living_left_triplet + living_above_and_below + living_right_above_and_below + living_right;
                self.inactive_cells.set(row, column, next_cell_state(living_self, living_neighbors));
                living_left_triplet = living_above_and_below + living_self;
                living_above_and_below = living_right_above_and_below;
                living_self = living_right;
            }
        }
        std::mem::swap(&mut self.cells, &mut self.inactive_cells);
    }
}

#[cfg(test)]
impl Universe {
    fn generate<F: Fn(usize) -> CellState>(width: usize, height: usize, generator: F) -> Self {
        Universe {
            cells: Table::generate(height, width, generator),
            inactive_cells: Table::with_fill(height, width, cell_state::DEATH),
        }
    }

    fn set_cells(&mut self, cells: &[(usize, usize, CellState)]) {
        for (row, column, state) in cells {
            self.cells.set(*row, *column, *state);
        }
    }

    fn cells(&self) -> &Table<CellState> {
        &self.cells
    }
}

#[test]
fn test_tick() {
    use cell_state::*;

    let mut before_tick = Universe::new(6, 6);
    before_tick.set_cells(&[(1, 2, BIRTH), (2, 3, BIRTH), (3, 1, BIRTH), (3, 2, BIRTH), (3, 3, BIRTH)]);
    before_tick.tick();

    let mut after_tick = Universe::generate(6, 6, |_| STAY_DEAD);
    after_tick.set_cells(&[
        (1, 2, DEATH),
        (2, 1, BIRTH),
        (2, 3, SURVIVAL),
        (3, 1, DEATH),
        (3, 2, SURVIVAL),
        (3, 3, SURVIVAL),
        (4, 2, BIRTH),
    ]);
    assert_eq!(before_tick.cells(), after_tick.cells());
}
