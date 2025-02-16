<script setup lang="ts">
const searchQuery = defineModel<string>('searchQuery')
const emit = defineEmits(['getSearchResults', 'onFilterShow'])

const handleInput = () => {
  emit('getSearchResults', searchQuery.value)
}

const handleFilterShow = () => {
  emit('onFilterShow')
}
</script>

<template>
  <div
    class="bg-search-input text-film-tertiary relative m-8 mx-[5vw] w-full justify-center rounded-[7px] p-0.5 shadow-xl"
  >
    <div class="bg-film-secondary flex w-full gap-4 rounded-[5px] px-3 py-2">
      <img alt="Search input icon" src="@/assets/icons/search.svg" width="24" height="24" />
      <input
        type="text"
        v-model="searchQuery"
        @input="handleInput"
        placeholder="Search for a movie"
        class="focus:font-bolder w-full focus:outline-none"
      />
      <span class="flex cursor-pointer items-center" @click="handleFilterShow">
        <img alt="Movie filter icon" src="@/assets/icons/filter.svg" width="24" height="24" />
      </span>
    </div>
  </div>
</template>
