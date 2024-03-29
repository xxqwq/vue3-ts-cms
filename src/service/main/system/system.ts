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
    url: `/users/${id}`
  })
}
//新建用户
export function newUserData(userInfo: any) {
  return myRequest.post({
    url: '/users/',
    data: userInfo
  })
}
//编辑用户
export function editUserData(id: number, userInfo: any) {
  return myRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
// 针对页面的网络请求：增删改查
export function postPageListData(pageName: string, queryInfo: any) {
  return myRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

//删除
export function deletePageById(pageName: string, id: number) {
  return myRequest.delete({
    url: `/${pageName}/${id}`,
  })
}
//新建
export function newPageData(pageName: string, pageInfo: any) {
  return myRequest.post({
    url: `${pageName}`,
    data: pageInfo
  })
}

//编辑
export function editPageData(pageName:string,id: number, pageInfo: any) {
  return myRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
