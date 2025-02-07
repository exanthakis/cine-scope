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
      class="fixed top-0 left-0 h-screen w-full bg-film-tertiary/75 z-10"
    ></div>
    <Transition name="dialog">
      <dialog
        open
        v-if="show"
        class="fixed top-[20vh] left-0 r-0 w-[90%] rounded-xs ml-auto mr-auto max-w-xl z-100 border-0 shadow-xl p-4 m-0 overflow-hidden bg-film-secondary"
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
