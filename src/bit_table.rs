use super::js;
use bitvec::prelude::BitVec;

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

pub struct BitTable {
    bits: BitVec,
    row_count: u32,
    column_count: u32,
}

impl BitTable {
    pub fn falsities(row_count: u32, column_count: u32) -> Self {
        Self {
            row_count,
            column_count,
            bits: BitVec::repeat(false, (row_count * column_count) as usize),
        }
    }

    pub fn randoms(row_count: u32, column_count: u32) -> Self {
        Self {
            row_count,
            column_count,
            bits: (0..(row_count * column_count))
                .map(|_| random_bool())
                .collect(),
        }
    }

    pub fn row_count(&self) -> u32 {
        self.row_count
    }

    pub fn column_count(&self) -> u32 {
        self.column_count
    }

    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.column_count + column) as usize
    }

    pub fn get(&self, row: u32, column: u32) -> bool {
        let index = self.get_index(row, column);
        self.bits[index]
    }

    pub fn set(&mut self, row: u32, column: u32, value: bool) {
        let index = self.get_index(row, column);
        self.bits.set(index, value)
    }

    pub fn as_ptr(&self) -> *const u8 {
        let ptr = self.bits.as_raw_slice().as_ptr();
        ptr as *const u8
    }
}
