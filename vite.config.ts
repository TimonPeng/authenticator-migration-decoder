import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ViteAliases } from 'vite-aliases';

const PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteAliases({ prefix: '~', useConfig: false })],
  server: {
    host: true,
    port: PORT,
  },
  preview: {
    host: true,
    port: PORT,
  },
}) satisfies UserConfig;
