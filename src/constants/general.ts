const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3'

const DEFAULT_LANGUAGE = 'en-US'

export const DEVICE_BREAKPOINTS = {
  SMALL: 640, //40rem
  MEDIUM: 768, //48rem
  LARGE: 1024, //64rem
  EXTRA_LARGE: 1280, //80rem
  EXTRA_LARGE2: 1536, //96rem
}

const MOVIES_SLIDER_BREAKPOINTS = {
  0: { slidesPerView: 2.2 },
  [DEVICE_BREAKPOINTS.SMALL]: { slidesPerView: 3.5 },
  [DEVICE_BREAKPOINTS.MEDIUM]: { slidesPerView: 4.5 },
  [DEVICE_BREAKPOINTS.LARGE]: { slidesPerView: 6.5 },
}

const CREDITS_SLIDER_BREAKPOINTS = {
  0: { slidesPerView: 3.5 },
  [DEVICE_BREAKPOINTS.SMALL]: { slidesPerView: 4.5 },
  [DEVICE_BREAKPOINTS.MEDIUM]: { slidesPerView: 5.3 },
  [DEVICE_BREAKPOINTS.LARGE]: { slidesPerView: 8.3 },
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
]

const FULL_NAME = 'Xanthakis Emmanouil'

export {
  TMDB_API_BASE_URL,
  DEFAULT_LANGUAGE,
  MOVIES_SLIDER_BREAKPOINTS,
  CREDITS_SLIDER_BREAKPOINTS,
  LANGUAGES,
  FULL_NAME,
}
