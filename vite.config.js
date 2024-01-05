import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { fileURLToPath } from 'url';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { normalizePath } from 'vite'

// because __dirname was showing undefined
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CompileTsServiceWorker = () => ({
    name: 'compile-typescript-service-worker',
    async writeBundle(_options, _outputBundle) {
        const inputOptions = {
            input: 'serviceworker.js',
            plugins: [nodeResolve()],
        }

        const outputOptions = {
            file: 'dist/serviceworker.js',
            format: 'es',
        }
        const bundle = await rollup(inputOptions)
        await bundle.write(outputOptions)
        await bundle.close()
    }
})

const CopyOfflineFolder = () => ({
    name: 'compile-typescript-service-worker',
    async writeBundle(_options, _outputBundle) {
        const inputOptions = {
            input: 'serviceworker.js',
            plugins: [nodeResolve()],
        }

        const outputOptions = {
            file: 'dist/serviceworker.js',
            format: 'es',
        }
        const bundle = await rollup(inputOptions)
        await bundle.write(outputOptions)
        await bundle.close()
    }
})

export default defineConfig({
    plugins: [react(),
    CompileTsServiceWorker(),
    viteStaticCopy({
        targets: [
            {
                src: './offline',
                dest: "."
                //dest: '.', // 2️⃣
            },
        ],
    }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
        },
    },
    build: {
        target: "ES2022" // <--------- ✅✅✅✅✅✅
    },
})
