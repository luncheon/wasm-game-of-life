pub struct Canvas {
    width: usize,
    height: usize,
    data: Vec<u32>,
}

impl Canvas {
    pub fn new(width: usize, height: usize) -> Self {
        Self {
            width,
            height,
            data: vec![0; width * height],
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn height(&self) -> usize {
        self.height
    }

    pub fn data(&self) -> &Vec<u32> {
        &self.data
    }

    fn get_index(&self, x: usize, y: usize) -> usize {
        y * self.width + x
    }

    pub fn draw_line_vertical(&mut self, x: usize, y1: usize, y2: usize, color: u32) {
        let mut index = self.get_index(x, y1);
        for _ in y1..=y2 {
            self.data[index] = color;
            index += self.width;
        }
    }

    pub fn draw_line_horizontal(&mut self, y: usize, x1: usize, x2: usize, color: u32) {
        for index in self.get_index(x1, y)..=self.get_index(x2, y) {
            self.data[index] = color;
        }
    }

    pub fn fill_rect(&mut self, x: usize, y: usize, w: usize, h: usize, color: u32) {
        let mut offset = self.get_index(x, y);
        for _ in 0..h {
            for index in offset..(offset + w) {
                self.data[index] = color;
            }
            offset += self.width;
        }
    }
}
