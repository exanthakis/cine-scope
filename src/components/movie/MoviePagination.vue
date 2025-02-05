<script setup lang="ts">
interface MoviePaginationProps {
  page: number
  route: string
  hasNextPage: boolean
}
defineProps<MoviePaginationProps>()
</script>

<template>
  <div class="mt-12 text-sm leading-6">
    <div class="flex items-center mb-10 font-semibold text-slate-700">
      <RouterLink
        id="page-prev"
        class="flex items-center group hover:text-slate-900"
        :to="{ name: route, query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</RouterLink
      >
      <RouterLink
        id="page-next"
        class="flex items-center ml-auto group hover:text-slate-900"
        :to="{ name: route, query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</RouterLink
      >
    </div>
  </div>
</template>
