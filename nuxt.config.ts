// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  compatibilityDate: '2025-05-15',

  nitro: {
    preset: 'node-server',
    experimental: {
      database: true,
    },
  },


  typescript: {
    typeCheck: true,
    strict: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
})
