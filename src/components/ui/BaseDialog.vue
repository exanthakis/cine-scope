<script setup lang="ts">
import type { BaseDialogProps } from '@/types/general'
import type { VNode } from 'vue'

defineProps<BaseDialogProps>()
defineEmits<{
  (event: 'close'): void
}>()
defineSlots<{
  /** Main content of the dialog */
  default?: () => VNode | VNode[]
  /** Header of the dialog */
  header?: () => VNode | VNode[]
  /** Action buttons  */
  actions?: () => VNode | VNode[]
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      @click="$emit('close')"
      class="bg-black-primary/75 fixed top-0 left-0 z-10 h-screen w-full"
    ></div>
    <Transition name="dialog">
      <dialog
        open
        v-if="show"
        :class="[
          'bg-white-primary fixed top-[10%] right-0 left-0 z-100 m-0 mr-auto ml-auto w-[90%] max-w-xl overflow-hidden rounded-xs border-0 p-4 shadow-xl',
          classes,
        ]"
      >
        <header>
          <slot name="header"></slot>
        </header>
        <section class="py-6">
          <slot></slot>
        </section>
        <menu>
          <slot name="actions">
            <!-- Default close btn -->
            <BaseButton mode="secondary" class="rounded-xs" :isLink="false" @click="$emit('close')">
              Close
            </BaseButton>
          </slot>
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
