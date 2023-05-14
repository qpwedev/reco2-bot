import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  esbuild: {
    jsxFactory: `jsx`,
    jsxFragment: `jsxFragment`,
    jsxInject: `import { jsx, jsxFragment } from 'react/jsx-runtime'`,
  },
});
