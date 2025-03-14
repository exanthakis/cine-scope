<script setup lang="ts">
import { FULL_NAME } from '@/constants/general'
import IconLinkedIn from '@/components/icons/IconLinkedIn.vue'
import IconGithub from '@/components/icons/IconGithub.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="footer-bg bg-blue-navy mt-auto w-full px-[5vw] shadow-2xl backdrop-blur md:px-[8vw] lg:px-[15vw]"
  >
    <div class="container w-full py-6 lg:py-8">
      <hr class="mb-6 border-gray-700 sm:mx-auto lg:mb-8" />
      <div
        class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:gap-2"
      >
        <span class="text-center text-sm text-gray-400">
          &copy; {{ year }} by
          <a href="https://emmanouelxanthakis.com/" target="_blank" rel="noreferrer">
            {{ FULL_NAME }}
          </a>
        </span>
        <div class="flex flex-col items-center justify-start text-sm text-gray-400">
          <span class="pb-4 text-center">
            This product uses the TMDB API but is not endorsed or certified by TMDB.</span
          >
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" class="pl-2">
            <img src="@/assets/icons/tmdb.svg" class="h-9 w-18" />
          </a>
        </div>
        <div class="mt-0 flex items-center gap-4 sm:justify-center">
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
