import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import type { RouteRecordRaw } from 'vue-router'
import { mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
  token: string,
  userInfo: any,
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account)
      const id = loginRes.data.id
      this.token = loginRes.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      //获取登录用户的信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      //根据角色请求用户的权限
      const userMenuResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenuResult.data
      this.userMenus = userMenus
      //进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)
      //请求role和department数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      //重要：动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach(route => {
        router.addRoute('main', route)
      });
      //页面跳转(main)
      router.push("/main")

    },
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache("userInfo")
      const userMenus = localCache.getCache("userMenus")
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach(route => {
          router.addRoute('main', route)
        });
      }
    }
  }
})
export default useLoginStore
