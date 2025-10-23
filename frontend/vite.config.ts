import { defineConfig } from 'vite'

export default defineConfig({
  server: { proxy: { '/auth': 'http://localhost:8080', '/dashboard': 'http://localhost:8080', '/onboarding': 'http://localhost:8080', '/feedback': 'http://localhost:8080' } }

})
