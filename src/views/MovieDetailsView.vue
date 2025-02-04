<script setup lang="ts">
import MovieDetails from '@/components/movie/MovieDetails.vue'
import type { MovieDetailsProps } from '@/types/component-types'

defineProps<MovieDetailsProps>()
</script>

<template>
  <Suspense>
    <MovieDetails :id="id" />
    <template #fallback>loading...</template>
  </Suspense>
</template>

<style lang="scss" scoped></style>
