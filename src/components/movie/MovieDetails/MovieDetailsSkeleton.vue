<script setup lang="ts">
import AnimatedPlaceholder from '@/components/ui/AnimatedPlaceholder.vue'
</script>

<template>
  <div class="w-full bg-[#181818] relative text-white">
    <div
      class="w-full bg-center bg-cover min-h-[70vh] bg-gradient-to-r from-gray-100 animate-pulse h-[80vh] px-[5vw] gradient-bottom after:z-[-1] after:absolute after:content-[''] after:left-0 after:h-full after:w-full after:top-0"
    >
      <div
        class="container flex items-center justify-start h-full py-12 bg-opacity-50 gradient-left after:z-[-1] after:absolute after:content-[''] after:left-0 after:right[-200px] after:top-0 after:w-[60%] after:h-full"
      >
        <div class="text-start z-100 w-[30%]">
          <div class="pl-0 pr-4 mx-auto">
            <div class="max-w-4xl mx-auto text-start">
              <span class="font-semibold text-gray-200 text-2xl uppercase py-2.5">
                <AnimatedPlaceholder class="max-w-[65%]" />
              </span>

              <!-- info metadata -->
              <div class="my-4 text-[#a3a3a3] font-normal">
                <span class="inline-block w-full">
                  <span class="absolute left-[-9999px] top-[-9999px]">Maturity Rating:</span>

                  <AnimatedPlaceholder class="w-[80%]" />
                </span>
              </div>
              <!-- overview -->
              <AnimatedPlaceholder class="max-w-[100%] h-10 mb-8" />

              <AnimatedPlaceholder class="max-w-[30%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pt-20 bg-[#181818] w-full px-[5vw]">
    <div class="container pb-5">
      <AnimatedPlaceholder class="max-w-[100%] h-10 mb-8" />
    </div>
  </div>
</template>
