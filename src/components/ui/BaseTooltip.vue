<template>
  <div class="has-tooltip">
    <span class="tooltip text-film-tertiary bottom-6 w-fit rounded bg-gray-100 p-1 shadow-lg"
      ><slot name="content"></slot
    ></span>
    <div class="flex">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  @apply invisible absolute;
}

.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
</style>
