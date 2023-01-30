import { LOGIN_TOKEN } from "@/global/constants";
import { localCache } from "@/utils/cache"
import { firstMenu } from "@/utils/map-menus";
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
      name: "main",
      component: () => import('../views/main/main.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ],
})

// //获取所有路由
// const localRoutes = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue'),
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue'),
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('../views/main/system/user/user.vue'),
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('../views/main/system/role/role.vue'),
//   }
// ]
// //动态的添加路由
// // router.addRoute('main', localRoutes[0])



//导航守卫
//参数“to-跳转到的位置，from-从哪里跳转过来
//返回值：决定导航的路径(不返回或者返回undefined就是默认跳转)
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith("/main") && !token) {
    return '/login'
  }
  if (to.path === "/main") {
    return firstMenu?.url
  }
  //要不要动态的加载路由

});
export default router
