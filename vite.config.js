import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// GitHub Pages serves this project at https://ani-2003-hd.github.io/Aniruddha-portfolio/
// so the base path must match the repo name exactly, or built asset URLs 404
// on the deployed site (the #1 cause of a blank deployed page).
export default defineConfig({
    plugins: [react()],
    base: '/Aniruddha-portfolio/',
});
