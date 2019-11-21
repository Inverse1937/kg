import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ClasslyDetail from '../views/RouteView/ClasslyDetail.vue'
import PlayMusic from '../views/RouteView/PlayMusic.vue'
import SingerSong from '../views/RouteView/SingerSong.vue'
import SongSearch from '../views/RouteView/SongSearch'
import MusicList from '../views/RouteView/MusicList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detail',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ClasslyDetail
  },
  {
    path:'/play',
    name:'play',
    component: PlayMusic
  },
  {
    path:'/singer',
    name:'singer',
    component: SingerSong
  },
  {
    path:'/search',
    name:'search',
    component: SongSearch
  },
  {
    path:'/list',
    name:'list',
    component: MusicList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
