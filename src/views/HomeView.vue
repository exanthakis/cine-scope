<script setup lang="ts">
import FiltersForm from '@/components/FiltersForm.vue'
import MovieCard from '@/components/movie/MovieCard.vue'
import MovieCardSkeleton from '@/components/movie/MovieCardSkeleton.vue'
import MoviePagination from '@/components/movie/MoviePagination.vue'
import SearchInput from '@/components/SearchInput.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { LANGUAGES } from '@/constants/general'
import { mockMovies } from '@/mocks/movies'
import MovieService from '@/services/MovieService'
import type { MovieFilter, ReleaseYear, SelectedFilters } from '@/types/general'
import { type Genre, type Movie } from '@/types/movie'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface HomeViewProps {
  page: number
  genres: string
}

const props = defineProps<HomeViewProps>()
const totalPages = ref(0)
const totalResults = ref<number | null>(null)
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
const genres = computed(() => props.genres)

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
  if (genres.value) selectedFilters.value.genres = [parseInt(genres.value)] //Initialize with genres from movie details hero click

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

// Watchers
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
            :searchQuery="searchQuery"
          />
        </template>
        <template #actions><span></span></template>
      </BaseDialog>
      <SearchInput
        v-model:searchQuery="searchQuery"
        @on-filter-show="showFilters = true"
        @clear-search-query="searchQuery = ''"
      />
    </div>
    <div
      v-if="isLoading"
      class="mx-auto grid grid-cols-2 gap-9 px-[5vw] py-10 sm:grid-cols-2 md:grid-cols-3 md:px-[8vw] lg:grid-cols-4 lg:px-[15vw] xl:grid-cols-5"
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
    <div
      class="px-[5vw] md:px-[8vw] lg:px-[15vw]"
      v-else-if="
        !isLoading &&
        totalResults &&
        totalResults > 0 &&
        movieResults?.length &&
        movieResults?.length > 0
      "
    >
      <p
        class="dark:text-white-primary flex flex-col justify-start gap-2 pb-4 text-left sm:flex-row"
      >
        <span class="sm:text-nowrap">
          Found
          <b>{{ totalResults }}</b> results for:
        </span>
        <span class="flex flex-wrap justify-start gap-2 sm:pl-2">
          <BaseBadge v-if="searchQuery.trim()" :title="searchQuery" @close="searchQuery = ''" />
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
      </p>
      <div
        class="max-2xl mx-auto grid grid-cols-2 gap-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
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
    <section class="px-[5vw] pb-10 md:px-[8vw] lg:px-[15vw]">
      <div class="mt-5 mb-4 w-full border-b border-gray-500/55 pb-2">
        <h2 class="text-black-primary relative w-fit text-2xl dark:text-white">
          Creator's Selections
          <span
            class="bg-red-netflix absolute top-0 -right-4 inline-flex h-2 w-2 animate-ping rounded-full opacity-75"
          ></span>
        </h2>
      </div>
      <div
        class="grid grid-cols-2 gap-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <MovieCard
          v-for="(trendingMovie, idx) in mockMovies"
          :key="trendingMovie.id"
          :id="trendingMovie.id"
          :title="trendingMovie.title"
          :imgUrl="trendingMovie.poster_path"
          :config="{
            num: idx + 1,
          }"
        />
      </div>
    </section>
  </main>
</template>
