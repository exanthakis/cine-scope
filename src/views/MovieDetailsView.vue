<script setup lang="ts">
import MovieDetails from '@/components/movie/movie-details/MovieDetails.vue'
import MovieDetailsSkeleton from '@/components/movie/movie-details/MovieDetailsSkeleton.vue'
import type { MovieDetailsProps } from '@/types/general'

defineProps<MovieDetailsProps>()
</script>

<template>
  <Suspense>
    <MovieDetails :id="id" />
    <template #fallback><MovieDetailsSkeleton /></template>
  </Suspense>
</template>

<style lang="scss" scoped></style>
