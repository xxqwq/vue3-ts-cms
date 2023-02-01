import { deleteUserById, getUsersListData } from "@/service/main/system/system";
import { defineStore } from "pinia";
import type { ISystemState } from "./type";
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
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
    }
  }
})

export default useSystemStore
