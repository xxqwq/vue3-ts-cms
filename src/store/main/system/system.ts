import { deletePageById, deleteUserById, editPageData, editUserData, getUsersListData, newPageData, newUserData, postPageListData } from "@/service/main/system/system";
import { defineStore } from "pinia";
import type { ISystemState } from "./type";
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async getUserListDataAction(queryInfo: any) {
      // 1.请求用户列表数据
      const userListResult = await getUsersListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      //删除数据操作
      const deleteResult = await deleteUserById(id)
      //重新请求新的数据
      this.getUserListDataAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      const userInfoResult = await newUserData(userInfo)
      //重新请求新的数据
      this.getUserListDataAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      //更新用户数据
      const editResult = await editUserData(id, userInfo)
      //重新请求新的数据
      this.getUserListDataAction({ offset: 0, size: 10 })
    },
    // 针对页面的数据：增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await (postPageListData(pageName, queryInfo))
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, queryInfo: any) {
      const editResult = await editPageData(pageName, id, queryInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
