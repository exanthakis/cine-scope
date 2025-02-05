<script setup lang="ts">
import MovieDetails from '@/components/movie/MovieDetails/MovieDetails.vue'
import MovieDetailsSkeleton from '@/components/movie/MovieDetails/MovieDetailsSkeleton.vue'
import type { MovieDetailsProps } from '@/types/component-types'

defineProps<MovieDetailsProps>()
</script>

<template>
  <Suspense>
    <MovieDetails :id="id" />
    <template #fallback><MovieDetailsSkeleton /></template>
  </Suspense>
</template>

<style lang="scss" scoped></style>
