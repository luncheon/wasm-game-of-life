use super::js;

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
    bits: Vec<bool>, // bitvec is much slower
    row_count: u32,
    column_count: u32,
}

impl BitTable {
    pub fn falsities(row_count: u32, column_count: u32) -> Self {
        Self {
            row_count,
            column_count,
            bits: vec![false; (row_count * column_count) as usize],
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

    #[inline]
    pub fn get(&self, row: u32, column: u32) -> bool {
        let index = self.get_index(row, column);
        self.bits[index]
    }

    pub fn set(&mut self, row: u32, column: u32, value: bool) {
        let index = self.get_index(row, column);
        self.bits[index] = value;
    }

    pub fn as_ptr(&self) -> *const u8 {
        self.bits.as_ptr() as *const u8
    }
}
