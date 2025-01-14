import Cookies from 'js-cookie'

export const cookies = {
  set: (name: string, value: string) => {
    Cookies.set(name, value)
  },
  get: (name: string) => {
    return Cookies.get(name)
  },
  remove: (name: string) => {
    Cookies.remove(name)
  },
}
