import myRequest from "@/service";

// 用户的网络请求
export function getUsersListData(queryInfo: any) {
  return myRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}