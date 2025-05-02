<script setup lang="ts">
import AnimatedPlaceholder from '@/components/ui/AnimatedPlaceholder.vue'
</script>

<template>
  <div class="dark:bg-blue-navy relative w-full bg-gray-400 text-white">
    <div
      class="bg-gradient-bottom mx-auto h-[80vh] min-h-[70vh] w-full animate-pulse bg-gradient-to-r from-gray-100 bg-cover bg-center after:absolute after:top-0 after:left-0 after:z-[-1] after:h-full after:w-full after:content-['']"
    >
      <div
        class="bg-opacity-50 bg-gradient-left after:right[-200px] 3xl:max-w-[100rem] container mx-auto flex h-full max-w-5xl items-center justify-start px-5 py-12 after:absolute after:top-0 after:left-0 after:z-[-1] after:h-full after:w-[60%] after:content-[''] sm:px-10 md:max-w-4xl lg:max-w-7xl"
      >
        <div class="z-100 w-[30%] text-start">
          <div class="mx-auto pr-4 pl-0">
            <div class="mx-auto max-w-4xl text-start">
              <span class="py-2.5 text-2xl font-semibold text-gray-200 uppercase">
                <AnimatedPlaceholder class="max-w-[65%]" />
              </span>

              <!-- info metadata -->
              <div class="text-gray-medium my-4 font-normal">
                <span class="inline-block w-full">
                  <span class="absolute top-[-9999px] left-[-9999px]">Maturity Rating:</span>

                  <AnimatedPlaceholder class="w-[80%]" />
                </span>
              </div>
              <!-- overview -->
              <AnimatedPlaceholder class="mb-8 h-10 max-w-[100%]" />

              <AnimatedPlaceholder class="max-w-[30%]" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="3xl:max-w-[100rem] absolute right-0 bottom-2 left-0 z-10 mx-auto w-[80%] max-w-5xl px-5 sm:px-10 md:max-w-4xl lg:max-w-7xl"
      >
        <AnimatedPlaceholder class="mx-auto h-14 max-w-[80%]" />
      </div>
    </div>
  </div>
  <div class="bg-blue-navy w-full pt-20">
    <div class="3xl:max-w-[100rem] mx-auto max-w-5xl px-5 pb-5 sm:px-10 md:max-w-4xl lg:max-w-7xl">
      <AnimatedPlaceholder class="mb-8 h-10 max-w-[100%]" />
    </div>
  </div>
</template>
