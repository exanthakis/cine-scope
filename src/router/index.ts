import { createRouter, createWebHistory } from 'vue-router'
import NetworkError from '@/views/NetworkError.vue'
import HomeView from '@/views/HomeView.vue'

import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movie-list',
      component: HomeView,
      props: (route) => ({
        page: parseInt(route.query.page?.toString() || '1'),
        genres: route.query.genres?.toString() || '',
      }),
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/popular',
      name: 'popular-list',
      component: () => import('@/views/PopularMoviesView.vue'),
      meta: {
        title: 'Popular Movies',
      },
    },
    {
      path: '/movies/:id',
      name: 'movie-details',
      props: (route) => ({ id: route.params.id, t: route.query.title || '' }),
      component: () => import('@/views/MovieDetailsView.vue'),
      meta: {
        title: 'Movie Details',
      },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoritesView.vue'),
      meta: {
        title: 'Favorites',
      },
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFound,
      props: true,
      meta: {
        title: '404 Resource',
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound,
      meta: {
        title: 'Not Found',
      },
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkError,
      meta: {
        title: 'Network Error',
      },
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

router.beforeEach((to, from, next) => {
  document.title = `${to.params.id ? `${to.query.t || 'Movie Detailss'}` : to.meta.title} | CineQuest`
  next()
})

export default router
