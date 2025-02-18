<script setup lang="ts">
import FiltersForm from '@/components/FiltersForm.vue'
import MovieCard from '@/components/movie/MovieCard.vue'
import MovieCardSkeleton from '@/components/movie/MovieCardSkeleton.vue'
import MoviePagination from '@/components/movie/MoviePagination.vue'
import SearchInput from '@/components/SearchInput.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import { LANGUAGES } from '@/constants/general'
import MovieService from '@/services/MovieService'
import type { MovieFilter, ReleaseYear, SelectedFilters } from '@/types/general'
import { type Genre, type Movie } from '@/types/movie'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface HomeViewProps {
  page: number
  genres: string
  year: number
  lang: string
}

const props = defineProps<HomeViewProps>()
const totalPages = ref(0)
const totalResults = ref(null)
const searchQuery = ref('')
const queryTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const movieResults = ref<Movie[] | null>(null)
const isLoading = ref(false)
const searchError = ref<string | null>(null)
const showFilters = ref(false)
const genresResult = ref<Genre[] | null>(null)
const selectedFilters = ref<SelectedFilters>({
  genres: [],
  releaseYear: null,
  language: '',
})
const router = useRouter()
const route = useRoute()

const page = computed(() => props.page)

const hasNextPage = computed(() => {
  return page.value < totalPages.value
})

const getSearchResults = async () => {
  if (queryTimeout.value) clearTimeout(queryTimeout.value)

  if (!searchQuery.value.trim() && !withGenres.value.trim() && !fullReleaseYear.value.trim()) {
    movieResults.value = null
    totalResults.value = null
    totalPages.value = 0
    return
  }
  movieResults.value = null
  searchError.value = null
  totalResults.value = null

  // Remove genres filters when is typed a search query since search api does not accept genres filter.
  // TODO: Show an alert
  if (searchQuery.value.trim()) {
    selectedFilters.value.genres = []
  }

  // Remove release year range filter when is typed a search query and we have set a range value through range slider. (releaseYear?.gte = 0 when we use single range slider)
  if (searchQuery.value.trim() && selectedFilters.value.releaseYear?.gte)
    selectedFilters.value.releaseYear = null

  queryTimeout.value = setTimeout(async () => {
    isLoading.value = true
    try {
      const movieDetails = await MovieService.searchMovies(
        searchQuery.value,
        withGenres.value,
        releaseYear.value,
        selectedLanguage.value,
        page.value,
      )
      totalResults.value = movieDetails.data.total_results
      movieResults.value = movieDetails.data.results
      totalPages.value = movieDetails.data.total_pages
    } catch (error) {
      searchError.value =
        error instanceof Error ? error.message : 'Failed to fetch data - please try again later'
      router.push({ name: 'network-error' })
    } finally {
      // Flicker Delay to display skeleton
      await new Promise((res) => setTimeout(res, 1000))
      isLoading.value = false
    }
  }, 1500)
}

// Filters General

const toggleFiltersDisplay = () => {
  showFilters.value = !showFilters.value
  document.documentElement.style.overflow = showFilters.value ? 'hidden' : 'auto'
}

const handleFiltersData = (data: MovieFilter) => {
  console.log('filters data', data)
  toggleFiltersDisplay()
  selectedFilters.value.genres = data.genres || []
  selectedFilters.value.releaseYear = data.releaseYear || []
  selectedFilters.value.language = data.language
}

// Genre Filter
onMounted(() => {
  genresResult.value = null
  MovieService.getGenres()
    .then((response) => {
      if (response.status === 200) {
        genresResult.value = response.data.genres
      } else throw new Error('Could not retrieve data!')
    })
    .catch((error) => {
      router.push({ name: 'network-error' })

      console.error(error)
    })
})

const withGenres = computed(() =>
  selectedFilters.value.genres ? selectedFilters.value.genres.join('|') : '',
)

const genreFilterName = (id: number): string => {
  if (!genresResult.value || genresResult.value.length === 0) return 'Unknown Genre'
  return genresResult.value.find((el) => el.id === id)?.name ?? 'Unknown Genre'
}

const handleGenreBadgeClick = (id: number) => {
  selectedFilters.value.genres = selectedFilters.value.genres.filter((el) => el !== id)
}

const resetFilters = () => {
  selectedFilters.value.genres = []
  selectedFilters.value.releaseYear = null
  selectedFilters.value.language = ''
  toggleFiltersDisplay()
}

// Release Year Filter
const releaseYear = computed((): ReleaseYear => {
  if (selectedFilters.value.releaseYear && selectedFilters.value.releaseYear.lte) {
    return {
      lte: `${selectedFilters.value.releaseYear?.lte}-12-31`,
      gte: `${selectedFilters.value.releaseYear?.gte}-01-01`,
    }
  }
  return {
    lte: '',
    gte: '',
  }
})

const fullReleaseYear = computed(() =>
  selectedFilters.value.releaseYear
    ? selectedFilters.value.releaseYear.gte + '|' + selectedFilters.value.releaseYear.lte
    : '',
)

const yearFilterTitle = computed(() =>
  selectedFilters.value.releaseYear?.gte
    ? `${selectedFilters.value.releaseYear.gte} - ${selectedFilters.value.releaseYear.lte ?? ''}`
    : (selectedFilters.value.releaseYear?.lte ?? ''),
)

// Language filter
const selectedLanguage = computed(() => selectedFilters.value.language)
const selectedFullLanguage = computed(() =>
  LANGUAGES.find((el) => el.code === selectedFilters.value.language),
)

watch([page, withGenres, searchQuery, fullReleaseYear, selectedLanguage], getSearchResults)

watch([withGenres, fullReleaseYear, selectedLanguage], () => {
  router.replace({
    name: 'movie-list',
    query: {
      ...route.query,
      genres: withGenres.value ?? undefined,
      year: fullReleaseYear.value ?? undefined,
      lang: selectedLanguage.value ?? undefined,
    },
  })
})
</script>

<template>
  <main class="!bg-radial-white container">
    <div class="align-center mx-auto flex w-full max-w-2xl justify-center">
      <BaseDialog :show="!!showFilters" title="Filters" @close="toggleFiltersDisplay">
        <template #default>
          <FiltersForm
            @submit-filters-form="handleFiltersData"
            @reset-filters="resetFilters"
            :genres="genresResult"
            :searchQuery="searchQuery"
          />
        </template>
        <template #actions>
          <!-- <div class="flex gap-3 pb-0">test actions</div> -->
        </template>
      </BaseDialog>
      <SearchInput
        v-model:searchQuery="searchQuery"
        @get-search-results="getSearchResults"
        @on-filter-show="showFilters = true"
      />
    </div>
    <div
      v-if="isLoading"
      class="max-2xl mx-auto grid grid-cols-1 gap-4 px-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <MovieCardSkeleton v-for="res in movieResults?.length" :key="res" />
    </div>
    <p v-else-if="!isLoading && searchError">{{ searchError }}</p>
    <p
      v-else-if="!isLoading && totalResults === 0 && searchQuery.trim().length > 0"
      class="text-center text-lg font-bold"
    >
      Sorry, we couldn't find any results
    </p>
    <div v-else class="px-5">
      <p
        v-if="movieResults?.length && movieResults?.length > 0"
        class="flex justify-start text-left"
      >
        Found&nbsp;
        <span class="pr-2">
          <b>{{ totalResults }}</b> results for:
        </span>
        <BaseBadge v-if="searchQuery.trim()" :title="searchQuery" @close="searchQuery = ''" />
        <span class="flex justify-start gap-2 pl-2">
          <BaseBadge
            v-for="filter in selectedFilters.genres"
            :key="filter"
            :title="genreFilterName(filter)"
            @close="handleGenreBadgeClick(filter)"
          />
          <BaseBadge
            v-if="selectedFilters.releaseYear"
            :title="yearFilterTitle"
            @close="selectedFilters.releaseYear = null"
          />
          <BaseBadge
            v-if="selectedFilters.language"
            :title="selectedFullLanguage?.name || selectedLanguage"
            @close="selectedFilters.language = ''"
          />
        </span>
      </p>
      <div
        class="max-2xl mx-auto grid grid-cols-1 gap-4 py-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <MovieCard
          v-for="movie in movieResults"
          :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :imgUrl="movie.poster_path"
        />
      </div>
    </div>

    <MoviePagination
      v-show="movieResults && movieResults.length > 0"
      :total-pages="totalPages"
      :page="page"
      :has-next-page="hasNextPage"
      route="movie-list"
    />
  </main>
</template>
