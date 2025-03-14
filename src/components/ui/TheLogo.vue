<script setup lang="ts"></script>

<template>
  <RouterLink class="z-2" :to="{ name: 'movie-list' }">
    <div class="flex items-center gap-2">
      <img alt="Logo tv" src="@/assets/icons/tv.svg" width="18" height="18" />
      <span class="text-white-primary text-[1.3rem] font-bold">CineScope</span>
    </div>
  </RouterLink>
</template>
