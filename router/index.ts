import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AbouView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: AbouView,
      // meta: { requiresAuth: true },
    }
  ],
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('jwtToken')

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!token) {
//       next({ name: 'login' })
//     } else {
//       const isExpired = checkTokenExpiration(token)
//       if (isExpired) {
//         localStorage.removeItem('jwtToken')
//         next({ name: 'login' })
//       } else {
//         next()
//       }
//     }
//   } else {
//     next()
//   }
// })

// function checkTokenExpiration(token) {
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]))
//     const exp = payload.exp * 1000 // Convertendo para milissegundos
//     return Date.now() > exp
//   } catch (error) {
//     return true
//   }
// }

export default router