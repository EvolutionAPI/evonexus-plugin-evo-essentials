import { defineConfig } from 'vite'
import { resolve } from 'path'

// Build 2 of 2: web-component widgets → ui/widgets/*.js
// Served at /plugins/{slug}/ui/widgets/ by the host's serve_widget endpoint.
// Widgets are plain TypeScript (no React) — they register customElements.
export default defineConfig({
  build: {
    outDir: 'ui/widgets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'pinned-notes': resolve(__dirname, 'src/widgets/pinned-notes.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es',
      },
    },
    sourcemap: true,
  },
})
