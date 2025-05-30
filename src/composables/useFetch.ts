import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { AxiosError } from 'axios'

export const useFetch = () => {
  const isLoading = ref(false)
  const router = useRouter()

  const handleError = (err: unknown, resource = 'movie') => {
    const error = err as AxiosError
    if (error?.response?.status === 404) {
      router.push({ name: '404-resource', params: { resource } })
    } else {
      router.push({ name: 'network-error' })
    }
  }

  const fetchData = async <T>(
    fetchFn: () => Promise<T>,
    { delay = 1000, updateLoading = true } = {},
  ): Promise<T | null> => {
    if (updateLoading) isLoading.value = true
    try {
      const data = await fetchFn()
      return data
    } catch (err) {
      handleError(err)
      return null
    } finally {
      if (delay) await new Promise((res) => setTimeout(res, delay))
      if (updateLoading) isLoading.value = false
    }
  }

  return {
    isLoading,
    fetchData,
  }
}
