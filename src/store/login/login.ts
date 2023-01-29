import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string,
  userInfo: any,
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
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
      //页面跳转(main)
      router.push("/main")

    }
  }
})
export default useLoginStore
