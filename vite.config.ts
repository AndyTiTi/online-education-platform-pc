import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve:{
    // https://cn.vitejs.dev/config/#resolve-alias
    alias:[
      {
        find:'@',
        replacement:path.resolve('./src')
      }
    ],
    // https://cn.vitejs.dev/config/#resolve-extensions
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  }
})
