#![cfg(target_arch = "wasm32")]

use wasm_bindgen_test::*;
use wasm_game_of_life::universe::cell_state::*;
use wasm_game_of_life::universe::Universe;

fn assert_tick_before_after(
    rows: usize,
    columns: usize,
    cells_before_tick: &[(usize, usize, CellState)],
    cells_after_tick: &[(usize, usize, CellState)],
) {
    let mut before_tick = Universe::new(rows, columns);
    for (row, column, state) in cells_before_tick {
        before_tick.set_cell(*row, *column, *state);
    }

    let mut after_tick = Universe::generate(rows, columns, |_| STAY_DEAD);
    for (row, column, state) in cells_after_tick {
        after_tick.set_cell(*row, *column, *state);
    }

    before_tick.tick();
    assert_eq!(&before_tick.cells_slice(), &after_tick.cells_slice());
}

#[wasm_bindgen_test]
fn tick() {
    assert_tick_before_after(
        6,
        6,
        &[(1, 2, BIRTH), (2, 3, BIRTH), (3, 1, BIRTH), (3, 2, BIRTH), (3, 3, BIRTH)],
        &[
            (1, 2, DEATH),
            (2, 1, BIRTH),
            (2, 3, SURVIVAL),
            (3, 1, DEATH),
            (3, 2, SURVIVAL),
            (3, 3, SURVIVAL),
            (4, 2, BIRTH),
        ],
    );
}
