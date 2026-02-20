import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Supabase Project URL
const SUPABASE_PROJECT_URL = "https://qnpoftjwfwzgxmuzqauc.supabase.co";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Bu hissə localhost-da /sitemap.xml sorğusunu Supabase Edge Function-a yönləndirir
      '/sitemap.xml': {
        target: `${SUPABASE_PROJECT_URL}/functions/v1/sitemap`,
        changeOrigin: true,
        rewrite: (path) => '', // Path-i silirik ki, birbaşa function URL-ə getsin
      },
      '/robots.txt': {
        target: `${SUPABASE_PROJECT_URL}/functions/v1/robots`,
        changeOrigin: true,
        rewrite: (path) => '',
      },
      '/llms.txt': {
        target: `${SUPABASE_PROJECT_URL}/functions/v1/llms`,
        changeOrigin: true,
        rewrite: (path) => '',
      }
    }
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));