import myRequest from "@/service";

export function getAmountListData() {
  return myRequest.get({
    url: 'goods/amount/list',
    
  })
}
