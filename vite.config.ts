import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Build 1 of 2: React pages → dist/pages/*.js
// Served at /plugins/{slug}/dist/pages/ by the host's serve_plugin_bundle endpoint.
//
// JSX is compiled with the "classic" runtime so all JSX calls become
// React.createElement() — no "react/jsx-runtime" bare specifier in the output.
// The host exposes window.React (see dashboard/frontend/src/main.tsx), so the
// plugin bundles can reference React.createElement() through the global.
//
// @evoapi/evonexus-ui is bundled into the plugin so the browser doesn't need an
// importmap to resolve it.  Only "react" is declared external; Rollup replaces it
// with the UMD global "React" (window.React set by the host's main.tsx).
//
// @evoapi/evonexus-ui resolves via Node resolution from node_modules (dist/index.js
// per the package's "exports" field). No alias — keeps the plugin repo standalone.
export default defineConfig({
  plugins: [
    react({
      // Classic runtime: JSX → React.createElement(). No react/jsx-runtime import.
      jsxRuntime: 'classic',
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: {
        'pages/notes': resolve(__dirname, 'src/pages/notes.tsx'),
        'pages/notes-list': resolve(__dirname, 'src/pages/notes-list.tsx'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      // Only externalize "react" — consumed via the window.React global shim.
      // @evoapi/evonexus-ui is bundled in (no importmap needed).
      external: ['react'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        // Tell Rollup the external "react" is available as window.React
        globals: { react: 'React' },
      },
    },
    sourcemap: true,
  },
})
