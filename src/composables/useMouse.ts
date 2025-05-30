import type { Ref } from 'vue'
import { ref, onMounted, onUnmounted } from 'vue'

export const useMouse = (
  elementRef: Ref<HTMLElement | null>,
  threshold: number = 0,
  screenWidthThreshold = 1,
) => {
  const x = ref(0)
  const y = ref(0)
  const isHovered = ref(false)

  const update = (event: MouseEvent) => {
    x.value = event.clientX - threshold
    y.value = event.clientY - threshold

    const screenWidth = window.innerWidth
    isHovered.value = event.clientX < screenWidth * screenWidthThreshold
  }

  onMounted(() => elementRef.value && elementRef.value.addEventListener('mousemove', update))
  onUnmounted(() => elementRef.value && elementRef.value.removeEventListener('mousemove', update))

  return { x, y, isHovered }
}
