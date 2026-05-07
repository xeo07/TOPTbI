import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import CatalogView from './views/CatalogView.vue'
import CakeView from './views/CakeView.vue'
import CakeDescription from './views/cake/CakeDescription.vue'
import CakeComposition from './views/cake/CakeComposition.vue'
import CakeReviews from './views/cake/CakeReviews.vue'
import ConstructorView from './views/ConstructorView.vue'
import OrderHistoryView from './views/OrderHistoryView.vue'
import FavoritesView from './views/FavoritesView.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import ProfileView from './views/ProfileView.vue'
import UsersView from './views/UsersView.vue'
import AdminLayout from './views/admin/AdminLayout.vue'
import AdminCakes from './views/admin/AdminCakes.vue'
import AdminAddCake from './views/admin/AdminAddCake.vue'
import AdminEditCake from './views/admin/AdminEditCake.vue'
import NotFoundView from './views/NotFoundView.vue'

import { useUsers } from './composables/useUsers'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogView
  },
  {
    path: '/cake/:id',
    name: 'cake',
    component: CakeView,
    children: [
      {
        path: '',
        name: 'cakeDescription',
        component: CakeDescription
      },
      {
        path: 'composition',
        name: 'cakeComposition',
        component: CakeComposition
      },
      {
        path: 'reviews',
        name: 'cakeReviews',
        component: CakeReviews
      }
    ]
  },
  {
    path: '/constructor',
    name: 'constructor',
    component: ConstructorView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/history',
    name: 'history',
    component: OrderHistoryView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    meta: {
      requiresAdmin: true
    },
    children: [
      {
        path: '',
        name: 'adminCakes',
        component: AdminCakes
      },
      {
        path: 'add',
        name: 'adminAddCake',
        component: AdminAddCake
      },
      {
        path: 'edit/:id',
        name: 'adminEditCake',
        component: AdminEditCake
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const usersStore = useUsers()

  if (to.meta.requiresAdmin && !usersStore.isAdmin.value) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.requiresAuth && !usersStore.isAuth.value) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  next()
})

export default router
