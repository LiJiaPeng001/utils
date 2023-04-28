import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue(), Unocss()],
  server: {
    host: "0.0.0.0",
  },
});
