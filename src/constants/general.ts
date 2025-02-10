const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3'

const DEFAULT_LANGUAGE = 'en-US'

const MOVIES_SLIDER_BREAKPOINTS = {
  0: { slidesPerView: 2.5 },
  640: { slidesPerView: 13.5 },
  768: { slidesPerView: 4.5 },
  1024: { slidesPerView: 6.5 },
}

const CREDITS_SLIDER_BREAKPOINTS = {
  0: { slidesPerView: 3.5 },
  640: { slidesPerView: 4.5 },
  768: { slidesPerView: 6.3 },
  1024: { slidesPerView: 8.3 },
}

export {
  TMDB_API_BASE_URL,
  DEFAULT_LANGUAGE,
  MOVIES_SLIDER_BREAKPOINTS,
  CREDITS_SLIDER_BREAKPOINTS,
}
