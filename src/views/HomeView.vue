<script setup lang="ts">
import FiltersForm from '@/components/FiltersForm.vue'
import MovieCards from '@/components/movie/MovieCards.vue'
import MovieCardSkeleton from '@/components/movie/MovieCardSkeleton.vue'
import MoviePagination from '@/components/movie/MoviePagination.vue'
import SearchInput from '@/components/SearchInput.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { LANGUAGES } from '@/constants/general'
import { mockMovies } from '@/mocks/movies'
import MovieService from '@/services/MovieService'
import type { MovieFilter, ReleaseYear, SelectedFilters } from '@/types/general'
import { type Genre, type Movie } from '@/types/movie'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface HomeViewProps {
  page: number
  genres: string
  query: string
  lang: string
  year: string
}

const props = defineProps<HomeViewProps>()

const queryTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const searchState = reactive({
  searchQuery: '',
  movieResults: null as Movie[] | null,
  isLoading: false,
  searchError: null as string | null,
})
const pagination = reactive({
  totalPages: 0,
  totalResults: null as number | null,
})
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
const genres = computed(() => props.genres)
const query = computed(() => props.query)
const lang = computed(() => props.lang)
const year = computed(() => props.year)

const hasNextPage = computed(() => {
  return page.value < pagination.totalPages
})

const getSearchResults = async () => {
  if (queryTimeout.value) clearTimeout(queryTimeout.value)

  if (
    !searchState.searchQuery.trim() &&
    !withGenres.value.trim() &&
    !fullReleaseYear.value.trim()
  ) {
    searchState.movieResults = null
    pagination.totalResults = null
    pagination.totalPages = 0
    return
  }
  searchState.movieResults = null
  searchState.searchError = null
  pagination.totalResults = null

  // Remove genres filters when is typed a search query since search api does not accept genres filter.
  // TODO: Show an alert
  if (searchState.searchQuery.trim()) {
    selectedFilters.value.genres = []
  }

  // Remove release year range filter when is typed a search query and we have set a range value through range slider. (releaseYear?.gte = 0 when we use single range slider)
  if (searchState.searchQuery.trim() && selectedFilters.value.releaseYear?.gte)
    selectedFilters.value.releaseYear = null

  queryTimeout.value = setTimeout(async () => {
    searchState.isLoading = true
    try {
      const movieDetails = await MovieService.searchMovies(
        searchState.searchQuery,
        withGenres.value,
        releaseYear.value,
        selectedLanguage.value,
        page.value,
      )
      pagination.totalResults = movieDetails.data.total_results
      searchState.movieResults = movieDetails.data.results
      pagination.totalPages = movieDetails.data.total_pages
    } catch (error) {
      searchState.searchError =
        error instanceof Error ? error.message : 'Failed to fetch data - please try again later'
      router.push({ name: 'network-error' })
    } finally {
      // Flicker Delay to display skeleton
      await new Promise((res) => setTimeout(res, 1000))
      queryTimeout.value = null
      searchState.isLoading = false
    }
  }, 1500)
}

// Filters General

const toggleFiltersDisplay = () => {
  showFilters.value = !showFilters.value
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
  if (genres.value)
    selectedFilters.value.genres = (
      Array.isArray(genres.value) ? genres.value.join('|') : genres.value || ''
    )
      ?.split('|')
      .map(Number) //Initialize with genres from movie details hero click
  if (query.value) searchState.searchQuery = query.value
  if (lang.value) selectedFilters.value.language = lang.value
  if (year.value) {
    selectedFilters.value.releaseYear = year.value.includes('|')
      ? { lte: year.value.split('|')[1], gte: year.value.split('|')[0] }
      : { lte: year.value, gte: '' }
  }

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

const removeYearsFilter = () => {
  if (selectedFilters.value.releaseYear && selectedFilters.value.releaseYear.lte) {
    selectedFilters.value.releaseYear.gte = ''
    selectedFilters.value.releaseYear.lte = ''
  }
}

// Language filter
const selectedLanguage = computed(() => selectedFilters.value.language)
const selectedFullLanguage = computed(() =>
  LANGUAGES.find((el) => el.code === selectedFilters.value.language),
)

const clearSearchQuery = () => {
  const query = { ...route.query }

  delete query.page
  delete query.genres
  delete query.query
  delete query.lang
  delete query.year

  searchState.searchQuery = ''
  router.replace({
    name: 'movie-list',
    query,
  })
}

const clearFilters = () => {
  clearSearchQuery()
  selectedFilters.value = {
    genres: [],
    releaseYear: null,
    language: '',
  }
}

// Watchers
watch(
  [page, withGenres, () => searchState.searchQuery, fullReleaseYear, selectedLanguage],
  getSearchResults,
)

//  Handle query updates for genres, year, language, and search query.
watch(
  [
    withGenres,
    selectedLanguage,
    () => searchState.searchQuery,
    () => searchState.isLoading,
    selectedFilters,
  ],
  () => {
    const query = { ...route.query }

    if (fullReleaseYear.value && fullReleaseYear.value != '|') {
      query.year = fullReleaseYear.value
    } else {
      delete query.year
    }

    if (selectedLanguage.value) {
      query.lang = selectedLanguage.value
    } else {
      delete query.lang
    }

    if (searchState.searchQuery && !searchState.isLoading && searchState.movieResults) {
      query.query = searchState.searchQuery
    } else {
      delete query.query
    }

    const newGenres = selectedFilters.value.genres?.join('|') || ''

    if (newGenres) {
      query.genres = newGenres
    } else {
      delete query.genres
    }

    const currentQuery = { ...route.query }
    const queryChanged = JSON.stringify(currentQuery) !== JSON.stringify(query)

    if (queryChanged) {
      router.replace({
        name: 'movie-list',
        query,
      })
    }
  },
  { deep: true },
)

watch(
  [showFilters],
  () => (document.documentElement.style.overflow = showFilters.value ? 'hidden' : 'auto'),
)
</script>

<template>
  <main class="w-full">
    <div class="align-center mx-auto flex w-full justify-center">
      <BaseDialog
        :show="!!showFilters"
        @close="toggleFiltersDisplay"
        classes="!bg-blue-navy text-white-primary"
      >
        <template #header>
          <h2 class="text-2xl">Filters</h2>
        </template>
        <template #default>
          <FiltersForm
            @submit-filters-form="handleFiltersData"
            @reset-filters="resetFilters"
            :genres="genresResult"
            :searchQuery="searchState.searchQuery"
          />
        </template>
        <template #actions><span></span></template>
      </BaseDialog>
      <SearchInput
        v-model:searchQuery="searchState.searchQuery"
        @on-filter-show="showFilters = true"
        @clear-search-query="clearSearchQuery"
      />
    </div>
    <div
      v-if="searchState.isLoading"
      class="3xl:max-w-[100rem] mx-auto grid max-w-5xl grid-cols-2 gap-9 px-5 py-10 pb-10 sm:grid-cols-2 sm:px-10 md:max-w-4xl md:grid-cols-3 lg:max-w-7xl lg:grid-cols-4 xl:grid-cols-5"
    >
      <MovieCardSkeleton v-for="res in searchState.movieResults?.length" :key="res" />
    </div>
    <p v-else-if="!searchState.isLoading && searchState.searchError">
      {{ searchState.searchError }}
    </p>
    <p
      v-else-if="
        !searchState.isLoading &&
        pagination.totalResults === 0 &&
        searchState.searchQuery.trim().length > 0
      "
      class="text-blue-navy text-center text-lg font-bold dark:text-white"
    >
      Sorry, we couldn't find any results
    </p>
    <div
      class="3xl:max-w-[100rem] mx-auto max-w-5xl px-5 sm:px-10 md:max-w-4xl lg:max-w-7xl"
      v-else-if="
        !searchState.isLoading &&
        pagination.totalResults &&
        pagination.totalResults > 0 &&
        searchState.movieResults?.length &&
        searchState.movieResults?.length > 0
      "
    >
      <p
        class="dark:text-white-primary flex flex-col justify-start gap-5 pb-6 text-left sm:flex-row sm:gap-3"
      >
        <span class="sm:text-nowrap">
          Found
          <b>{{ pagination.totalResults }}</b> results for:
        </span>
        <span class="flex h-fit flex-wrap justify-start gap-2 sm:pl-2">
          <BaseBadge
            v-if="searchState.searchQuery.trim()"
            :title="searchState.searchQuery"
            @close="searchState.searchQuery = ''"
          />
          <span class="flex flex-wrap justify-start gap-2">
            <BaseBadge
              v-for="filter in selectedFilters.genres"
              :key="filter"
              :title="genreFilterName(filter)"
              @close="handleGenreBadgeClick(filter)"
            />
            <BaseBadge v-if="yearFilterTitle" :title="yearFilterTitle" @close="removeYearsFilter" />
            <BaseBadge
              v-if="selectedFilters.language"
              :title="selectedFullLanguage?.name || selectedLanguage"
              @close="selectedFilters.language = ''"
            />
          </span>
        </span>
        <BaseButton
          class="!bg-white-primary !text-black-primary m-0 !h-fit cursor-pointer !rounded-full !px-3 !py-1 whitespace-pre sm:ml-auto"
          mode="secondary"
          type="button"
          @click="clearFilters"
        >
          Clear All
        </BaseButton>
      </p>

      <MovieCards :movies="searchState.movieResults" />
    </div>

    <MoviePagination
      v-show="searchState.movieResults && searchState.movieResults.length > 0"
      :total-pages="pagination.totalPages"
      :page="page"
      :has-next-page="hasNextPage"
      route="movie-list"
    />
    <section
      v-show="!searchState.movieResults && !searchState.isLoading && !pagination.totalResults"
      class="3xl:max-w-[100rem] mx-auto max-w-5xl px-5 pb-10 sm:px-10 md:max-w-4xl lg:max-w-7xl"
    >
      <div class="mt-5 mb-4 w-full border-b border-gray-500/55 pb-2">
        <h2 class="text-black-primary relative w-fit text-2xl dark:text-white">
          Creator's Selections
          <span
            class="bg-red-netflix absolute top-0 -right-4 inline-flex h-2 w-2 animate-ping rounded-full opacity-75"
          ></span>
        </h2>
      </div>

      <MovieCards :movies="mockMovies" :show-num="true" :limit="15" />
    </section>
  </main>
</template>
