<script setup lang="ts">
import SiteNavigation from './components/layout/SiteNavigation.vue'
import TheFooter from './components/layout/TheFooter.vue'
</script>

<template>
  <div
    class="max-7xl bg-radial-white text-film-tertiary relative flex min-h-[100vh] flex-col items-center overflow-hidden"
  >
    <SiteNavigation />
    <RouterView />
    <TheFooter />
  </div>
</template>
