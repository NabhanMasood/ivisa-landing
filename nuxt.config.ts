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
      title: "Visa123 - Management System",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/logo/Visa123logo.svg" },
        // 👇 Add Google Fontt
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: ""
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
        },
        // 👇 Preload payment strip SVGgg
        {
          rel: "preload",
          href: "/svg/payment-strip.svg",
          as: "image",
          type: "image/svg+xml"
        },
        // 👇 Preload custom cursor (diagonal)
        {
          rel: "preload",
          href: "/cursor/cursor-diagonal.png",
          as: "image",
          type: "image/png"
        }
      ],
    },
  },

  nitro: {
    preset: "vercel",
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL ?? 'http://localhost:5001',

      currencyApiUrl: process.env.NUXT_PUBLIC_CURRENCY_API_URL,
      currencyApiKey: process.env.NUXT_PUBLIC_CURRENCY_API_KEY,
      stripePublishableKey: process.env.NUXT_STRIPE_PUBLISHABLE_KEY || '',
    },
  },
});
