<script lang="ts" setup>
// compiler macro
definePageMeta({
  layout: 'main',
})
useHead(() => ({
  title: 'Login',
}))
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle text="Login" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <div>Login</div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
