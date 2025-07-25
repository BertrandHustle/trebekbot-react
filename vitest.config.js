import { defineConfig } from "vitest/config";
import jsconfigPaths from 'vite-jsconfig-paths'
import path from 'path'


export default defineConfig({
    plugins: [jsconfigPaths()],
    resolve: {
        alias: [
          {find: "@components", replacement: path.resolve(__dirname, './src/components') },
          {find: "@test", replacement: path.resolve(__dirname, './src/test') },
        ]
      },
    test: {
        globals: true,
        environment: 'jsdom',
       
    }
});