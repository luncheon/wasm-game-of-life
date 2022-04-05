pub struct Table<T: Copy> {
    row_count: usize,
    column_count: usize,
    values: Vec<T>,
}

impl<T: Copy> Table<T> {
    pub fn with_fill(row_count: usize, column_count: usize, value: T) -> Self {
        Self {
            row_count,
            column_count,
            values: vec![value; row_count * column_count],
        }
    }

    pub fn generate<F: Fn(usize) -> T>(row_count: usize, column_count: usize, generator: F) -> Self {
        Self {
            row_count,
            column_count,
            values: (0..(row_count * column_count)).map(generator).collect(),
        }
    }

    pub fn row_count(&self) -> usize {
        self.row_count
    }

    pub fn column_count(&self) -> usize {
        self.column_count
    }

    fn get_index(&self, row: usize, column: usize) -> usize {
        row * self.column_count + column
    }

    pub fn get(&self, row: usize, column: usize) -> T {
        let index = self.get_index(row, column);
        self.values[index]
    }

    pub fn set(&mut self, row: usize, column: usize, value: T) {
        let index = self.get_index(row, column);
        self.values[index] = value;
    }

    pub fn as_slice(&self) -> &[T] {
        self.values.as_slice()
    }

    pub fn as_ptr(&self) -> *const T {
        self.values.as_ptr()
    }
}
