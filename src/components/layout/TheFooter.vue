<script setup lang="ts">
import { FULL_NAME } from '@/constants/general'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="footer-bg mt-auto w-full bg-[#10141e] px-[5vw] shadow-2xl backdrop-blur md:px-[8vw] lg:px-[15vw]"
  >
    <div class="container w-full py-6 lg:py-8">
      <hr class="mb-6 border-gray-700 sm:mx-auto lg:mb-8" />
      <div
        class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:gap-2"
      >
        <span class="text-center text-sm text-gray-400">
          &copy; {{ year }} by {{ FULL_NAME }}
        </span>
        <div class="flex items-center justify-start text-sm text-gray-400">
          Film data courtesy of
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" class="pl-2">
            <img src="@/assets/icons/tmdb.svg" class="h-6 w-12" />
          </a>
        </div>
        <div class="mt-0 flex items-center gap-4 sm:justify-center">
          <a
            href="https://github.com/exanthakis"
            target="_blank"
            class="group ms-5 text-gray-500 hover:text-white"
          >
            <svg
              class="h-4 w-4 text-xl transition group-hover:scale-125"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">GitHub account</span>
          </a>
          <a
            href="https://www.linkedin.com/in/emmanouil-xanthakis"
            target="_blank"
            class="group text-gray-500 hover:text-white"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              class="h-4 w-4 text-xl transition group-hover:scale-125"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
              ></path>
            </svg>
            <span class="sr-only">LinkedIn account</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
