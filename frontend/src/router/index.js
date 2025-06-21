import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Timeline from '../views/Timeline.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/signup', component: Signup },
  { path: '/timeline', component: Timeline },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router