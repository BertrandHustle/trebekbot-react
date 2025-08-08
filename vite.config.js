import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const path = require('path');

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: 'build', // CRA's default build output
    },
    plugins: [react()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
    }
})