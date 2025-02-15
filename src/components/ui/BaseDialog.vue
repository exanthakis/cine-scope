<script setup lang="ts">
interface BaseDialogProps {
  show: boolean
  title: string
}
defineProps<BaseDialogProps>()
defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      @click="$emit('close')"
      class="bg-film-tertiary/75 fixed top-0 left-0 z-10 h-screen w-full"
    ></div>
    <Transition name="dialog">
      <dialog
        open
        v-if="show"
        class="bg-film-secondary fixed top-[20vh] right-0 left-0 z-100 m-0 mr-auto ml-auto w-[90%] max-w-xl overflow-hidden rounded-xs border-0 p-4 shadow-xl"
      >
        <header class="">
          <slot name="header">
            <h2 class="text-2xl">{{ title }}</h2>
          </slot>
        </header>
        <section class="py-6">
          <slot></slot>
        </section>
        <menu>
          <slot name="actions"></slot>
        </menu>
      </dialog>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}
</style>
