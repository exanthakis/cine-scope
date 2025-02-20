<script setup lang="ts">
interface MobileNavProps {
  open: boolean
}

defineProps<MobileNavProps>()
defineEmits(['close'])
</script>

<template>
  <div
    :class="[
      'absolute top-0 right-0 bottom-0 left-0 z-1 flex h-fit flex-col items-end justify-between bg-[#10141e] px-[5vw] pt-14 pb-6 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden',
      open ? 'translate-y-0' : '-translate-y-[100%]',
    ]"
  >
    <button
      type="button"
      className="fixed right-[5vw] top-4 mb-4 block py-1 text-3xl text-white "
      :aria-expanded="open"
      @click="$emit('close')"
    >
      <svg
        class="text-film-secondary size-7 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
      <span className="sr-only">Close menu</span>
    </button>

    <nav
      class="flex w-full flex-col items-start justify-start gap-4 pt-6 pb-2 font-light text-gray-400 sm:flex-row md:hidden"
    >
      <ul class="flex flex-col items-start gap-7">
        <li
          :class="[
            'text-2xl opacity-0 transition-[opacity] duration-1000 ease-in-out',
            open ? 'opacity-100' : 'opacity-0',
          ]"
          :style="{ transitionDelay: open ? '100ms' : '0ms' }"
          @click="$emit('close')"
        >
          <RouterLink :to="{ name: 'movie-list' }">Search</RouterLink>
        </li>
        <li
          :class="[
            'text-2xl opacity-0 transition-[opacity] duration-1000 ease-in-out',
            open ? 'opacity-100' : 'opacity-0',
          ]"
          :style="{ transitionDelay: open ? '200ms' : '0ms' }"
          @click="$emit('close')"
        >
          <RouterLink :to="{ name: 'popular-list' }">Popular</RouterLink>
        </li>
        <li
          :class="[
            'text-2xl opacity-0 transition-[opacity] duration-1000 ease-in-out',
            open ? 'opacity-100' : 'opacity-0',
          ]"
          :style="{ transitionDelay: open ? '300ms' : '0ms' }"
          @click="$emit('close')"
        >
          <RouterLink :to="{ name: 'favorites' }">Favorites</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
