import { resolve } from 'path'
import ViteYaml from '@modyfi/vite-plugin-yaml'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,

  // typescripts
  typescript: {
    strict: true,
    typeCheck: true,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      mapKey: process.env.NUXT_PUBLIC_API_KEY_GOOGLE_MAP,
      apiMap: `https://trial.api-service.navitime.biz/${process.env.NUXT_PUBLIC_NAVITIME_CID}/v1`,
      authKey: process.env.NUXT_PUBLIC_NAVITIME_AUTH_KEY,
      requestCode: process.env.NUXT_PUBLIC_NAVITIME_REQUEST_CODE,
      hostName: process.env.NUXT_PUBLIC_NAVITIME_HOST,
    },
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      script: [
        {
          src: `https://trial.api-service.navitime.biz/${process.env.NUXT_PUBLIC_NAVITIME_CID}/v1/map_script?host=${process.env.NUXT_PUBLIC_NAVITIME_HOST}&signature=${process.env.NUXT_PUBLIC_NAVITIME_AUTH_KEY}&request_code=${process.env.NUXT_PUBLIC_NAVITIME_REQUEST_CODE}`,
        },
      ],
    },
  },

  // css
  css: ['~/assets/scss/app.scss'],

  // module::pinia
  pinia: {
    storesDirs: ['~/stores/**', '#/stores/**', '@/stores/**'],
  },

  // modules
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/device',
  ],

  imports: {
    dirs: [resolve('./stores'), '~/stores'],
  },

  // experimental features
  experimental: {
    localLayerAliases: true,
  },

  // auto import components
  components: true,

  // localization - i18n config
  i18n: {
    vueI18n: './i18n.config.ts',
  },

  // intlify: {
  //   localeDir: 'locales',
  //   vueI18n: {
  //     locale: 'ja',
  //     fallbackLocale: 'ja',
  //     availableLocales: ['en', 'ja'],
  //   },
  // },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  vite: {
    plugins: [ViteYaml()],
  },

  compatibilityDate: '2025-01-13',
})
