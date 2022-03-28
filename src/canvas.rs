pub struct Canvas {
    width: u32,
    height: u32,
    data: Vec<u32>,
}

impl Canvas {
    pub fn new(width: u32, height: u32) -> Self {
        Self {
            width,
            height,
            data: vec![0; (width * height) as usize],
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn data(&self) -> &Vec<u32> {
        &self.data
    }

    fn get_index(&self, x: u32, y: u32) -> usize {
        (y * self.width + x) as usize
    }

    pub fn get_pixel_color(&self, x: u32, y: u32) -> u32 {
        self.data[self.get_index(x, y)]
    }

    pub fn draw_line_vertical(&mut self, x: u32, y1: u32, y2: u32, color: u32) {
        let mut index = self.get_index(x, y1);
        for _ in y1..=y2 {
            self.data[index] = color;
            index += self.width as usize;
        }
    }

    pub fn draw_line_horizontal(&mut self, y: u32, x1: u32, x2: u32, color: u32) {
        for index in self.get_index(x1, y)..=self.get_index(x2, y) {
            self.data[index] = color;
        }
    }

    pub fn fill_rect(&mut self, x: u32, y: u32, w: u32, h: u32, color: u32) {
        let mut offset = self.get_index(x, y);
        for _ in 0..h {
            for index in offset..(offset + w as usize) {
                self.data[index] = color;
            }
            offset += self.width as usize;
        }
    }
}
