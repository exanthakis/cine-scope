import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MOVIES_VIEW } from '@/types/enums'

export const useMoviesViewStore = defineStore('movies-view', () => {
  const view = ref<MOVIES_VIEW>(MOVIES_VIEW.CARDS_VIEW)

  const toggleView = () => {
    view.value =
      view.value === MOVIES_VIEW.CARDS_VIEW ? MOVIES_VIEW.LIST_VIEW : MOVIES_VIEW.CARDS_VIEW
  }

  const setView = (newView: MOVIES_VIEW) => {
    view.value = newView
  }

  return {
    view,
    toggleView,
    setView,
  }
})
