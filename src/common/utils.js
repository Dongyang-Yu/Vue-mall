export function debounce(func, delay=100) { // 防抖动函数
  let timer = null
  return function (...args) { // ...表示可以传多个参数
    if(timer) clearTimeout(timer)

    timer = setTimeout(()=>{
      func.apply(this, args)
    }, delay)
  }
}

// 正则表达式进行日期格式化：字符串匹配利器
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// 补齐前置零
/*
* 如4h:4m:4s => 04:04:04
* */
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
