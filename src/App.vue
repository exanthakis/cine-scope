<script setup lang="ts">
import SiteNavigation from './components/layout/SiteNavigation.vue'
</script>

<template>
  <div
    class="max-7xl bg-radial-white text-film-tertiary relative flex min-h-[100vh] flex-col items-center"
  >
    <SiteNavigation />

    <RouterView />
  </div>
</template>
