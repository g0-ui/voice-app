import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // 開発環境では '/'、本番環境では '/sanae-voice-app/'
    base: command === 'build' ? '/sanae-voice-app/' : '/',
  };
});
