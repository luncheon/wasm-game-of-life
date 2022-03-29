pub struct Table<T: Copy> {
    row_count: u32,
    column_count: u32,
    values: Vec<T>,
}

impl<T: Copy> Table<T> {
    pub fn with_fill(row_count: u32, column_count: u32, value: T) -> Self {
        Self {
            row_count,
            column_count,
            values: vec![value; (row_count * column_count) as usize],
        }
    }

    pub fn generate<F: Fn(u32) -> T>(row_count: u32, column_count: u32, generator: F) -> Self {
        Self {
            row_count,
            column_count,
            values: (0..(row_count * column_count)).map(generator).collect(),
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

    pub fn get(&self, row: u32, column: u32) -> T {
        let index = self.get_index(row, column);
        self.values[index]
    }

    pub fn set(&mut self, row: u32, column: u32, value: T) {
        let index = self.get_index(row, column);
        self.values[index] = value;
    }

    pub fn as_ptr(&self) -> *const T {
        self.values.as_ptr()
    }
}
