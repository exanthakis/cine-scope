import type { Movie, MovieRes } from '@/types/movie'
import type { Ref } from 'vue'

export const filterUniqueById = <T extends { id: number }>(items: T[]): T[] => {
  const seenIds = new Set<number>()
  return items.filter((item) => {
    if (seenIds.has(item.id)) return false
    seenIds.add(item.id)
    return true
  })
}

export const handlePaginatedFetch = async (
  fetchFn: () => Promise<MovieRes>,
  pageRef: Ref<string>,
  moviesRef: Ref<Movie[]>,
) => {
  const currentPage = parseInt(pageRef.value)

  const newMovies = await fetchFn()

  if (newMovies?.total_pages && currentPage <= newMovies.total_pages) {
    pageRef.value = (currentPage + 1).toString()
    moviesRef.value.push(...newMovies.results)
  }
}
