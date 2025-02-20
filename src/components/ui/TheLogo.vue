<script setup lang="ts"></script>

<template>
  <RouterLink class="z-2" :to="{ name: 'movie-list' }">
    <div class="flex items-center gap-2">
      <img alt="Logo tv" src="@/assets/icons/tv.svg" width="20" height="20" />
      <span class="text-film-secondary text-2xl font-bold">CineQuest</span>
    </div>
  </RouterLink>
</template>
