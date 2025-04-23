<script setup lang="ts">
import { FULL_NAME } from '@/constants/general'
import IconLinkedIn from '@/components/icons/IconLinkedIn.vue'
import IconGithub from '@/components/icons/IconGithub.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer-bg bg-blue-navy mt-auto w-full shadow-2xl backdrop-blur">
    <div class="mx-auto w-full max-w-5xl px-10 py-6 md:max-w-4xl lg:max-w-7xl lg:py-8">
      <hr class="mb-6 border-gray-700 lg:mx-auto lg:mb-8" />
      <div
        class="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-2"
      >
        <span class="text-md text-center text-gray-400">
          &copy; {{ year }} by
          <a href="https://emmanouelxanthakis.com/" target="_blank" rel="noreferrer">
            {{ FULL_NAME }}
          </a>
        </span>
        <div
          class="text-md order-1 flex flex-col items-center justify-start text-gray-400 lg:order-0"
        >
          <span class="pb-4 text-center">
            This product uses the TMDB API but is not endorsed or certified by TMDB.</span
          >
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" class="pl-2">
            <img src="@/assets/icons/tmdb.svg" class="h-9 w-20" alt="TMDB logo icon" />
          </a>
        </div>
        <div class="mt-0 flex items-center gap-4 lg:justify-center">
          <a
            href="https://github.com/exanthakis"
            target="_blank"
            class="group ms-5 text-gray-500 hover:text-white"
          >
            <IconGithub />
            <span class="sr-only">GitHub account</span>
          </a>
          <a
            href="https://www.linkedin.com/in/emmanouil-xanthakis"
            target="_blank"
            class="group text-gray-500 hover:text-white"
          >
            <IconLinkedIn />
            <span class="sr-only">LinkedIn account</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
