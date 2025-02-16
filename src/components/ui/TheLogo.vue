<script setup lang="ts"></script>

<template>
  <RouterLink :to="{ name: 'movie-list' }">
    <div class="flex items-center gap-2">
      <img alt="search-icon" class="" src="@/assets/icons/tv.svg" width="20" height="20" />
      <span class="text-film-secondary text-2xl font-bold">CineQuest</span>
    </div>
  </RouterLink>
</template>
