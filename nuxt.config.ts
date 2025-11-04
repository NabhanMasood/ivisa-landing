import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  app: {
    head: {
      title: "iVisa - Management System",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/logo/Visa123logo.svg" },
      ],
    },
  },

  // 👇 Add this block
  nitro: {
    preset: "vercel",
  },

  // Runtime config for API
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL ?? 'https://ivisa123-backend-production.up.railway.app',
    },
  },
});