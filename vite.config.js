import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            // manifest: {
            //     "icons": [
            //         {
            //             "src": "/src/assets/maskable.png",
            //             "sizes":"196x196",
            //             "type": "image/png",
            //             "purpose": "any maskable"
            //         },
            //         {
            //             "src": "/src/assets/logo199x192.png",
            //             "sizes": "199x192",
            //             "type": "image/png"
            //         },
            //         {
            //             "src": "/src/assets/logo256x247.png",
            //             "sizes": "256x247",
            //             "type": "image/png"
            //         },
            //         {
            //             "src": "/src/assets/logo384x271.png",
            //             "sizes": "384x371",
            //             "type": "image/png"
            //         },
            //         {
            //             "src": "/src/assets/logo512x494.png",
            //             "sizes": "512x494",
            //             "type": "image/png"
            //         }
            //     ]
            // }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
