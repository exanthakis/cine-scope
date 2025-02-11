<script setup lang="ts">
const searchQuery = defineModel<string>('searchQuery')
const emit = defineEmits(['getSearchResults'])

const handleInput = () => {
  emit('getSearchResults', searchQuery.value)
}
</script>

<template>
  <div
    class="m-8 relative bg-search-input rounded-[7px] p-0.5 text-film-tertiary w-full justify-center shadow-xl mx-[5vw]"
  >
    <div class="py-2 px-3 w-full bg-film-secondary rounded-[5px] flex gap-4">
      <img
        alt="Imdb logo"
        class="logo bg-film-secondary"
        src="@/assets/icons/search.svg"
        width="24"
        height="24"
      />
      <input
        type="text"
        v-model="searchQuery"
        @input="handleInput"
        placeholder="Search for a movie"
        class="focus:font-bolder focus:outline-none w-full"
      />
    </div>
  </div>
</template>
