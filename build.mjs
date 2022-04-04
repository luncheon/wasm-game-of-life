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

const buildWasm = () => {
  try {
    execSync('wasm-pack --log-level warn build', { stdio: 'inherit' });
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
