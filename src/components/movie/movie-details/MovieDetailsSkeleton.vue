<script setup lang="ts">
import AnimatedPlaceholder from '@/components/ui/AnimatedPlaceholder.vue'
</script>

<template>
  <div class="dark:bg-blue-navy relative w-full bg-gray-400 text-white">
    <div
      class="bg-gradient-bottom h-[80vh] min-h-[70vh] w-full animate-pulse bg-gradient-to-r from-gray-100 bg-cover bg-center px-[5vw] after:absolute after:top-0 after:left-0 after:z-[-1] after:h-full after:w-full after:content-[''] md:px-[8vw] lg:px-[15vw]"
    >
      <div
        class="bg-opacity-50 bg-gradient-left after:right[-200px] container flex h-full items-center justify-start py-12 after:absolute after:top-0 after:left-0 after:z-[-1] after:h-full after:w-[60%] after:content-['']"
      >
        <div class="z-100 w-[30%] text-start">
          <div class="mx-auto pr-4 pl-0">
            <div class="mx-auto max-w-4xl text-start">
              <span class="py-2.5 text-2xl font-semibold text-gray-200 uppercase">
                <AnimatedPlaceholder class="max-w-[65%]" />
              </span>

              <!-- info metadata -->
              <div class="my-4 font-normal text-[#a3a3a3]">
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

      <div class="absolute bottom-2 z-10 w-[80%]">
        <AnimatedPlaceholder class="h-14 max-w-[100%]" />
      </div>
    </div>
  </div>
  <div class="bg-blue-navy w-full px-[5vw] pt-20 md:px-[8vw] lg:px-[15vw]">
    <div class="container pb-5">
      <AnimatedPlaceholder class="mb-8 h-10 max-w-[100%]" />
    </div>
  </div>
</template>
