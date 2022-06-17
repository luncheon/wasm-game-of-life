import esbuild from 'esbuild';
import { wasmLoader } from 'esbuild-plugin-wasm';
import { execSync } from 'node:child_process';
import { watch } from 'node:fs';

/**
 * @type esbuild.BuildOptions
 */
const esbuildOptions = {
  entryPoints: ['docs/index.ts'],
  outdir: 'docs/',
  format: 'esm',
  bundle: true,
  minify: true,
  assetNames: '[name]',
  plugins: [wasmLoader({ mode: 'deferred' })],
};

execSync('cargo install --root .crates wasm-bindgen-cli --version 0.2.80', { stdio: 'inherit' });
execSync('cargo install --root .crates wasm-snip', { stdio: 'inherit' });
const buildWasm = () => {
  try {
    // execSync('wasm-pack --log-level warn build', { stdio: 'inherit' });
    const crate = 'wasm_game_of_life';
    const outDir = 'pkg';
    const wasmPath = `${outDir}/${crate}_bg.wasm`;
    execSync('cargo build --target wasm32-unknown-unknown --release', { stdio: 'inherit' });
    execSync(`.crates/bin/wasm-bindgen target/wasm32-unknown-unknown/release/${crate}.wasm --out-dir ${outDir}`, { stdio: 'inherit' });
    execSync(`.crates/bin/wasm-snip --snip-rust-fmt-code --snip-rust-panicking-code ${wasmPath} -o ${wasmPath}`, { stdio: 'inherit' });
    execSync(`npx wasm-opt -O ${wasmPath} -o ${wasmPath}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(error);
  }
};
buildWasm();

if (process.argv.includes('--serve')) {
  const debounce = (callback) => {
    let timeoutId;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, 400);
    };
  };
  const port = 8000;
  esbuild.serve({ servedir: 'docs/', port }, esbuildOptions).then(() => console.log(`http://localhost:${port}`));
  watch('src', { recursive: true }, debounce(buildWasm));
} else {
  esbuild.build(esbuildOptions);
}
