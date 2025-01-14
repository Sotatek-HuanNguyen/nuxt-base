/* eslint-disable import/named */
import type { AsyncData, UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import { ResponseCode } from '~/constants'

export function useCustomFetch<DataT, ErrorT>(
  url: string,
  options: UseFetchOptions<DataT> = {},
  onSuccess?: (data: DataT) => void,
  onError?: (err: any) => void,
) {
  const token = useCookie('token')
  const config = useRuntimeConfig()
  const defaults: UseFetchOptions<DataT> = {
    baseURL: config.public.apiBase,
    // cache request
    key: url,

    // set user token if connected
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},

    onResponse(_ctx) {
      if (onSuccess) onSuccess(_ctx.response._data)
    },

    onResponseError(_ctx) {
      const { response } = _ctx
      if (response.status === ResponseCode.UNAUTHORIZED) navigateTo('/login')
      if (response.status === ResponseCode.BAD_REQUEST) {
        // show notification
        if (onError) onError(response)
      } else {
        // eslint-disable-next-line no-lonely-if
        if (onError) return onError(response)
      }
    },
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
