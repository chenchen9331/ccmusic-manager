import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
      path: '/Home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [
        {
          path: '/Index',
          component: resolve => require(['../pages/Index.vue'], resolve)
        },
        {
          path: '/Consumer',
          component: resolve => require(['../pages/Consumer.vue'], resolve)
        },
        {
          path: '/Song',
          component: resolve => require(['../pages/Song.vue'], resolve)
        },
        {
          path: '/Singer',
          component: resolve => require(['../pages/Singer.vue'], resolve)
        },
        {
          path: '/SongSheet',
          component: resolve => require(['../pages/SongSheet.vue'], resolve)
        },
        {
          path: '/SheetSong',
          component: resolve => require(['../pages/SheetSong.vue'], resolve)
        }

      ]
    }
  ]
})
