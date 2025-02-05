<script setup lang="ts">
const searchQuery = defineModel<string>('searchQuery')
const emit = defineEmits(['getSearchResults'])

const handleInput = () => {
  emit('getSearchResults', searchQuery.value)
}
</script>

<template>
  <div
    class="m-8 relative search-input rounded-sm p-4 text-white w-full justify-center shadow-xl mx-[5vw]"
  >
    <input
      type="text"
      v-model="searchQuery"
      @input="handleInput"
      placeholder="Search for a movie"
      class="py-0 px-1 w-full bg-transparent focus:font-bolder focus:outline-none"
    />
  </div>
</template>
