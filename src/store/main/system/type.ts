export interface ISystemState {
  usersList: IUser[],
  usersTotalCount: number,
  pageList: any[],
  pageTotalCount: number
}
export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  role: number
  createAt: string
  updateAt: string
}

