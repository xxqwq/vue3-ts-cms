import { LOGIN_TOKEN } from "@/global/constants";
import { localCache } from "@/utils/cache"
import { createRouter, createWebHashHistory } from "vue-router"
const router = createRouter({
  history: createWebHashHistory(),
  //映射关系：path=》component
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue'),
      children: [
        {
          path: '/main/analysis/overview',
          component: () => import('../views/main/analysis/overview/overview.vue'),
        },
        {
          path: '/main/analysis/dashboard',
          component: () => import('../views/main/analysis/dashboard/dashboard.vue'),
        },
        {
          path: '/main/system/user',
          component: () => import('../views/main/system/user/user.vue'),
        },
        {
          path: '/main/system/role',
          component: () => import('../views/main/system/role/role.vue'),
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ],

})
//导航守卫
//参数“to-跳转到的位置，from-从哪里跳转过来
//返回值：决定导航的路径(不返回或者返回undefined就是默认跳转)
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === "/main" && !token) {
    return '/login'
  }

});
export default router
