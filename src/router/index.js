import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        layout: 'main',
        auth : true
      }
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('../views/HistoryView.vue'),
      meta: {
        layout: 'main',
        auth : true
      }
    },
    {
      path: '/planning',
      name: 'Planning',
      component: () => import('../views/PlanningView.vue'),
      meta: {
        layout: 'main',
        auth : true
      }
    },
    {
      path: '/record',
      name: 'Record',
      component: () => import('../views/RecordView.vue'),
      meta: {
        layout: 'main',
        auth : true
      }
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('../views/CategoriesView.vue'),
      meta: {
        layout: 'main',
        auth : true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        layout: 'main',
        auth : true
      }
    },
    {
      path: '/detail/:idRecord',
      name: 'DetailRecord',
      component: () => import('../views/DetailRecordView.vue'),
      meta: {
        layout: 'main',
        auth : true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        layout: 'auth',
        auth : false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        layout: 'auth',
        auth : false
      }
    },
    {
      path: '/reset',
      name: 'Reset',
      component: () => import('../views/ResetView.vue'),
      meta: {
        layout: 'auth',
        auth : false
      }
    },
  ]
})

router.beforeEach((to, _, next) => {
const requiredAuth = to.meta.auth
const auth = getAuth()

if(requiredAuth && auth.currentUser) {
  next()
} else if(requiredAuth && !auth.currentUser) {
  next('/login?message=auth')
} else {
  next()
}

})

export default router
