import { createRouter, createWebHistory } from 'vue-router'
import MovieDetailsView from '@/views/MovieDetailsView.vue'
import NetworkError from '@/views/NetworkError.vue'
import HomeView from '@/views/HomeView.vue'
import PopularMovies from '@/views/PopularMoviesView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movie-list',
      component: HomeView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') }),
    },
    {
      path: '/popular',
      name: 'popular-list',
      component: PopularMovies,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') }),
    },
    {
      path: '/movies/:id',
      name: 'movie-details',
      props: true,
      component: MovieDetailsView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FavoritesView.vue'),
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFound,
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkError,
    },
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savePosition) {
    if (savePosition) {
      return savePosition
    }
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
