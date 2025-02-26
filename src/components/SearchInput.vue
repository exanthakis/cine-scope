<script setup lang="ts">
import IconClose from './icons/IconClose.vue'
import IconFilter from './icons/IconFilter.vue'
import IconSearch from './icons/IconSearch.vue'

const searchQuery = defineModel<string>('searchQuery')
const emit = defineEmits<{
  (event: 'onFilterShow'): void
  (event: 'clearSearchQuery'): void
}>()

const handleFilterShow = () => {
  emit('onFilterShow')
}
</script>

<template>
  <div class="bg-search-input m-8 rounded-[7px] p-0.5">
    <div
      class="bg-film-secondary dark:text-film-secondary flex w-full gap-4 rounded-[5px] px-3 py-1 dark:bg-gray-900"
    >
      <span class="flex cursor-pointer items-center" @click="handleFilterShow">
        <IconFilter class="h-6 w-6 min-w-2" />
      </span>
      <div class="search-wrapper relative w-full">
        <input
          class="w-40 border-none p-1 text-sm transition-[width] duration-200 outline-none not-placeholder-shown:w-90 focus:w-55 sm:w-43 sm:focus:w-90"
          type="search"
          placeholder="Search for a movie"
          v-model="searchQuery"
        />
        <IconSearch
          class="search-icon text-[hsl(214, 8.1%, 61.2%)] transition-[opacity, rotate, visibility] pointer-events-none invisible absolute top-[50%] right-1 h-4 w-4 translate-x-0 translate-y-[-50%] rotate-90 cursor-pointer rounded-sm opacity-0 transition-discrete duration-200"
        />
        <button
          class="x-icon transition-[opacity, rotate, visibility] pointer-events-none invisible !absolute !top-[50%] !right-1 !h-4 !w-4 !translate-x-0 !translate-y-[-50%] rotate-90 !cursor-pointer rounded-sm transition-discrete duration-200"
          @click="$emit('clearSearchQuery')"
        >
          <IconClose />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.x-icon:focus-visible {
  box-shadow: 0 0 0 0.1rem hsl(200, 61%, 18%);
}

.x-icon {
  opacity: 0;
}

.search-wrapper:has(input:placeholder-shown) .search-icon,
.search-wrapper:has(input:not(:placeholder-shown)) .x-icon {
  opacity: 1;
  pointer-events: all;
  rotate: 0deg;
  visibility: visible;
}

button {
  all: unset;
}

/* clears the ‘X’ from Internet Explorer */
input[type='search']::-ms-clear,
input[type='search']::-ms-reveal {
  appearance: none;
  width: 0;
  height: 0;
}

/* clears the ‘X’ from Chrome */
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  appearance: none;
}
</style>
