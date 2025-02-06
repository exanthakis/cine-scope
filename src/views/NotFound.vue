<script setup lang="ts">
interface NotFoundProps {
  resource?: string
}

const { resource = 'page' } = defineProps<NotFoundProps>()
</script>

<template>
  <div class="p-6 text-center">
    <h1>Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <RouterLink class="font-bold" :to="{ name: 'movie-list' }">Back to the home page</RouterLink>
  </div>
</template>
