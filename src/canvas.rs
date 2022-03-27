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

    pub fn pixel_color(&self, x: u32, y: u32) -> u32 {
        self.data[(y * self.width + x) as usize]
    }

    pub fn draw_line_vertical(&mut self, x: u32, y1: u32, y2: u32, color: u32) {
        let mut index = y1 * self.width + x;
        for _ in y1..=y2 {
            self.data[index as usize] = color;
            index += self.width;
        }
    }

    pub fn draw_line_horizontal(&mut self, y: u32, x1: u32, x2: u32, color: u32) {
        let offset = (y * self.width) as usize;
        for index in (x1 as usize + offset)..=(x2 as usize + offset) {
            self.data[index] = color;
        }
    }

    pub fn fill_rect(&mut self, x: u32, y: u32, w: u32, h: u32, color: u32) {
        let mut y_index = (self.width * y) as usize;
        for _y in 0..h {
            for index in (y_index + x as usize)..(y_index + x as usize + w as usize) {
                self.data[index] = color;
            }
            y_index += self.width as usize;
        }
    }
}
