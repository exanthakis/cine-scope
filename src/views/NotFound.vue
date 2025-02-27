<script setup lang="ts">
interface NotFoundProps {
  resource?: string
}

const { resource = 'page' } = defineProps<NotFoundProps>()
</script>

<template>
  <div class="text-film-tertiary dark:text-film-secondary p-6 text-center">
    <h1
      class="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl"
    >
      404
    </h1>
    <p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
      The {{ resource }} you're looking for is not here.
    </p>
    <RouterLink class="text-xl font-bold" :to="{ name: 'movie-list' }">
      Back to the home page
    </RouterLink>
  </div>
</template>
