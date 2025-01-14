export default defineI18nConfig(async () => {
  const messages: { [key: string]: any } = {}
  const localeFiles = import.meta.glob('./locales/*.yml')

  for (const path in localeFiles) {
    const match = path.match(/\.\/locales\/(.*)\.yml$/)
    const locale = match ? match[1] : ''
    const content = (await localeFiles[path]()) as { default: any }
    messages[locale] = content.default
  }

  return {
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
  }
})
