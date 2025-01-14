<template>
  <h1>{{ $t('pages.index.title') }}</h1>
  <LanguageSwitcher type="select-box" />
</template>

<script lang="ts" setup>
import { capitalize } from '~/utils/str'
// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'main',
})

useHead(() => ({
  title: capitalize(t('pages.setting.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.setting.description'),
    },
  ],
}))
</script>
