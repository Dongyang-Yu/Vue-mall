import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'

  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

/*
let totalNums = []
const nums1 = [20, 15, 66]
const nums2 = [21, 33, 4]
// for(let n of nums1) {
//   totalNums.push(n)
// }

totalNums.push(...nums1) // 将数组nums1中所有的元素解析出来存入totalNums
*/
