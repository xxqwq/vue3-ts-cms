import { getUsersListData } from "@/service/main/system/system";
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
  }
})

export default useSystemStore
