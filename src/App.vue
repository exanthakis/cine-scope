<script setup lang="ts">
import SiteNavigation from './components/layout/SiteNavigation.vue'
</script>

<template>
  <div class="relative flex flex-col items-center max-7xl min-h-[100vh] bg-radial-white">
    <SiteNavigation />

    <RouterView />
  </div>
</template>
