import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), mkcert(), nodePolyfills(), svgr()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
