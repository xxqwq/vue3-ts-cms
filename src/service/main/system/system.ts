import myRequest from "@/service";

// 用户的网络请求
export function getUsersListData(queryInfo: any) {
  return myRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
//删除用户
export function deleteUserById(id: number) {
  return myRequest.delete({
    url:`/users/${id}`
  })
}
//新建用户
export function newUserData(userInfo:any) {
  return myRequest.post({
    url: '/users/',
    data:userInfo
  })
}
