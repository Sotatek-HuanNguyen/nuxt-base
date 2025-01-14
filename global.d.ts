// import { IntlifyModuleOptions } from '@intlify/nuxt3'
import { VueUseNuxtOptions } from '@vueuse/nuxt'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    name: string
    author: {
      name: string
      link: string
    }
  }
}

declare module 'nuxt/config' {
  interface NuxtConfig {
    // intlify?: IntlifyModuleOptions
    i18n?: any
    vueuse?: VueUseNuxtOptions
    elementPlus?: Options
  }
}

declare module '#app' {
  interface NuxtApp {
    $api: {
      get<ReqType, ResType>(url: string, params?: ReqType): Promise<ResType>
      post<ReqType, ResType>(
        url: string,
        data?: ReqType,
        config?: AxiosRequestConfig<ReqType>,
      ): Promise<ResType>
      put<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType>
      delete<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType>
      getBody<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType>
    }
  }
}

declare module 'vue-i18n'

export {}
