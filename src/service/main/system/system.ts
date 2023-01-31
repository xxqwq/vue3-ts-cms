import myRequest from "@/service";

// 用户的网络请求
export function postUsersListData() {
  return myRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}
