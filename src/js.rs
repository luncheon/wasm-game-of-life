use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub type Date;

    #[wasm_bindgen(static_method_of = Date)]
    pub fn now() -> f64;

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    pub fn log(s: &str);
}
