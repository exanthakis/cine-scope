<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../ui/BaseButton.vue'
import type { MoviePaginationProps } from '@/types/general'

const router = useRouter()
const { page, route, totalPages } = defineProps<MoviePaginationProps>()

const goToPage = (pageNumber: number) => {
  router.push({ name: route, query: { ...router.currentRoute.value.query, page: pageNumber } })
}

const visiblePages = computed(() => {
  const range = []
  const maxVisible = 3

  let start = Math.max(1, page - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
})
</script>

<template>
  <div class="mx-auto mt-12 max-w-2xl text-sm leading-6">
    <div
      class="mb-10 flex items-center justify-center gap-1 font-semibold text-slate-700 dark:text-slate-100"
    >
      <RouterLink
        id="page-prev"
        :class="[
          'group flex items-center pr-2 text-lg hover:text-slate-900 sm:pr-4 dark:hover:text-slate-400',
          page === 1 ? 'pointer-events-none opacity-25' : '',
        ]"
        :to="{ name: route, query: { page: page - 1 } }"
        rel="prev"
        >&#60;
      </RouterLink>

      <!-- First Page -->
      <BaseButton
        v-if="visiblePages[0] > 1"
        class="dark:bg-film-secondary dark:text-film-tertiary !px-2 sm:!px-3"
        :mode="page === 1 ? 'primary' : 'secondary'"
        :isLink="false"
        @click="goToPage(1)"
      >
        1
      </BaseButton>

      <!-- Dots for skipped pages -->
      <span v-if="visiblePages[0] > 2" class="px-2">...</span>

      <BaseButton
        v-for="p in visiblePages"
        :key="p"
        :mode="p === page ? 'primary' : 'secondary'"
        class="dark:bg-film-secondary dark:text-film-tertiary !px-2 sm:!px-3"
        :isLink="false"
        @click="goToPage(p)"
      >
        {{ p }}
      </BaseButton>

      <!-- Dots for skipped pages -->
      <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="px-2">...</span>

      <!-- Last Page -->
      <BaseButton
        v-if="visiblePages[visiblePages.length - 1] < totalPages"
        :mode="'secondary'"
        class="dark:bg-film-secondary dark:text-film-tertiary !px-2 sm:!px-3"
        :isLink="false"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </BaseButton>

      <RouterLink
        id="page-next"
        :to="{ name: route, query: { page: page + 1 } }"
        rel="next"
        :class="[
          'group flex items-center pl-2 text-lg hover:text-slate-900 sm:pl-4 dark:hover:text-slate-400',
          !hasNextPage ? 'pointer-events-none opacity-25' : '',
        ]"
      >
        &#62;</RouterLink
      >
    </div>
  </div>
</template>
