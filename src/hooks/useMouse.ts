import type { Ref } from 'vue'
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse(elementRef: Ref<HTMLElement | null>, threshold: number = 0) {
  const x = ref(0)
  const y = ref(0)

  const update = (event: MouseEvent) => {
    x.value = event.clientX - threshold
    y.value = event.clientY - threshold
  }

  onMounted(() => elementRef.value && elementRef.value.addEventListener('mousemove', update))
  onUnmounted(() => elementRef.value && elementRef.value.removeEventListener('mousemove', update))

  return { x, y }
}
