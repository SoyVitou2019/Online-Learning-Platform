import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// Fix #1
function resolveRelative(file, origin) {
    if (file.startsWith('../')) {
        // There is no way I can get the parent folder of this import when `origin` is a virtual entry :(
        // If you have a better solution for this please let me know, thanks!
        parent += '/0'.repeat(toCount(file.split('../')) - 1);
        // console.log([parent, file, normalizePath(resolve(parent + '/' + file))]);
        return normalizePath(resolve(parent + '/' + file));
    }
    if (file.startsWith('./')) {
        return normalizePath(resolve(parent + '/' + file));
    }
    return null; // Continue to the next task(s)!
}

function pathResolve(options) {
    return {
        resolveId: function(file, origin) {
            // Your local include path must either starts with `./` or `../`
            if (file.startsWith('./') || file.startsWith('../')) {
                // Return an absolute include path
                return resolveRelative(file, origin);
            }
            return null; // Continue to the next plugins!
        }
    };
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
    }
})
