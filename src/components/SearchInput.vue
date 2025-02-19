<script setup lang="ts">
const searchQuery = defineModel<string>('searchQuery')
const emit = defineEmits(['getSearchResults', 'onFilterShow', 'clearSearchQuery'])

const handleInput = () => {
  emit('getSearchResults', searchQuery.value)
}

const handleFilterShow = () => {
  emit('onFilterShow')
}
</script>

<template>
  <div class="bg-search-input m-8 rounded-[7px] p-0.5">
    <div class="bg-film-secondary flex w-full gap-4 rounded-[5px] px-3 py-1">
      <span class="flex cursor-pointer items-center" @click="handleFilterShow">
        <img
          alt="Movie filter icon"
          src="@/assets/icons/filter.svg"
          width="24"
          height="24"
          class="min-w-2"
        />
      </span>
      <div class="search-wrapper relative w-full">
        <input
          class="w-40 border-none p-1 text-sm transition-[width] duration-200 outline-none not-placeholder-shown:w-90 focus:w-55 sm:w-43 sm:focus:w-90"
          type="search"
          placeholder="Search for a movie"
          v-model="searchQuery"
          @input="handleInput"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="search-icon text-[hsl(214, 8.1%, 61.2%)] transition-[opacity, rotate, visibility] pointer-events-none invisible absolute top-[50%] right-1 h-4 w-4 translate-x-0 translate-y-[-50%] rotate-90 cursor-pointer rounded-sm opacity-0 transition-discrete duration-200"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <button
          class="x-icon transition-[opacity, rotate, visibility] pointer-events-none invisible !absolute !top-[50%] !right-1 !h-4 !w-4 !translate-x-0 !translate-y-[-50%] rotate-90 !cursor-pointer rounded-sm transition-discrete duration-200"
          @click="$emit('clearSearchQuery')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"
            ></path>
          </svg>
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
