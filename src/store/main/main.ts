import { getEntireDepartment, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'
interface IMainState {
  entireRoles: any[],
  entireDepartments: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDepartment()
      this.entireRoles = rolesResult.data.list
      this.entireDepartments=departmentResult.data.list
    }
  }
})
export default useMainStore
