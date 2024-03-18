// 在一个.d.ts文件中声明接口
declare global {
  interface String {
    padLeft(length: number, charStr: string): string
    padRight(length: number, charStr: string): string
    format(...args: any): string
  }
  interface Number {
    padLeft(length: number, charStr: string): string
    padRight(length: number, charStr: string): string
  }

  interface Date {
    format(args: any | any[]): string
  }
}

//方法一扩展（C#中padLeft、padRight）
String.prototype.padLeft = function (len: number, charStr: string): string {
  var s = this + ''
  return new Array(len - s.length + 1).join(charStr) + s
}
String.prototype.padRight = function (len: number, charStr: string) {
  var s = this + ''
  return s + new Array(len - s.length + 1).join(charStr)
}
String.prototype.format = function (...args: any[]): string {
  /// <summary>
  /// var template1 = "我是{0}，今年{1}了".format("loogn", 22);
  /// var template1 = "我是{0}，今年{1}了".format(["loogn", 22]);
  /// var template2 = "我是{name}，今年{age}了".format({ name: "loogn", age: 22 })
  /// </summary>

  // let result: String = this
  // if (args.length == 0 || arguments.length == 0) {
  //   return result.toString()
  // }

  // if (args.length == 1 && args.length == 1 && typeof args == 'object') {
  //   // console.log('arguments', arguments, 'args', args)
  //   for (let key in args) {
  //     const reg = new RegExp('({' + key + '})', 'g')
  //     result = result.replace(reg, args[key])
  //   }
  // } else {
  //   var arr = args;
  //   const partten = /\{(\d+)\}/g
  //   result = result.replace(partten, function (m, i) {
  //     return arr[i]
  //   })
  // }
  // return result.toString()

  // 通义灵码
  // 如果参数是对象，则使用键值对替换占位符
  // if (typeof args === 'object' && !Array.isArray(args)) {
  //   return this.replace(/\{(\w+)\}/g, (match, key) => {
  //     console.log('object', match, key, args)
  //     if (args.hasOwnProperty(key)) {
  //       return args[key]
  //     } else {
  //       //throw new Error(`找不到键为 ${key} 的属性`)
  //     }
  //   })
  // }
  // // 否则，如果参数是数组，则按照索引替换占位符
  // else if (Array.isArray(args)) {
  //   return this.replace(/\{\d+\}/g, (match, index) => {
  //     console.log('object', match, index, args)
  //     const num = parseInt(match.slice(1, -1))
  //     if (args[num] !== undefined) {
  //       return args[num]
  //     } else {
  //       // throw new Error(`找不到索引为 ${num} 的元素`)
  //     }
  //   })
  // } else {
  //   // throw new Error('format方法需要一个对象或数组作为参数')
  // }
  // return this.toString()
  let that = this
  if (!args || args.length == 0) {
    return this.toString()
  }

  if (args.length == 1) {
    const arg0 = args[0]
    if (Array.isArray(arg0)) {
      return that.replace(/\{(\d+)\}/g, function (match, index) {
        // console.log('Array', match, index, arg0)
        return typeof arg0[index] !== 'undefined' ? arg0[index] : match
      })
    } else if (typeof arg0 === 'object') {
      return that.replace(/\{(\w+)\}/g, function (match, key) {
        // console.log('object', match, key, arg0)
        return typeof arg0[key] !== 'undefined' ? arg0[key] : match
      })
    } else if (typeof arg0 === 'string') {
      return that.replace(/\{0\}/g, arg0)
    }
  } else {
    return that.replace(/\{(\d+)\}/g, function (match, index) {
      // console.log('Array', match, index, args)
      return typeof args[index] !== 'undefined' ? args[index] : match
    })
  }
  return that.toString()
  // // 百度
  // var that = this
  // if (typeof args === 'string') {
  //   return that.replace(/\{(\d+)\}/g, args)
  // }
  // // 如果args不是对象，则假设它是一个数组，按顺序替换占位符
  // else if (typeof args === 'object' && args instanceof Array) {
  //   return that.replace(/\{(\d+)\}/g, function (match, index) {
  //     console.log('Array', match, index, args)
  //     return typeof args[index] !== 'undefined' ? args[index] : match
  //   })
  // }
  // // 如果args是一个对象，则使用对象的键值对来替换模板字符串中的占位符
  // else if (typeof args === 'object') {
  //   return that.replace(/\{(\w+)\}/g, function (match, key) {
  //     console.log('object', match, key, args)
  //     return typeof args[key] !== 'undefined' ? args[key] : match
  //   })
  // }
  // // 如果args不是对象也不是数组，则直接返回原字符串
  // return that.toString()
}

// String.prototype.trimWithOutTab = function () {
//   return this.replace(/(^\s*)|(\s*$)/g, '')
//   // return this.replace(/^\s+|\s+$/g, (match, key) => match.replace(/\t/g, '\t'))
// }
Number.prototype.padLeft = function (len, charStr) {
  var s = this + ''
  return new Array(len - s.length + 1).join(charStr) + s
}
Number.prototype.padRight = function (len, charStr) {
  var s = this + ''
  return s + new Array(len - s.length + 1).join(charStr)
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt: string): string {
  //author: zhengsh 2016-9-5
  const obj: { [key: string]: any } = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in obj) {
    if (obj.hasOwnProperty(k) && new RegExp('(' + k + ')').test(fmt)) {
      const objProp = obj[k]
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? objProp : ('00' + objProp).substr(('' + objProp).length)
      )
    }
  }

  return fmt
}
/*
 *字符统计
 */

const statisticsCharCount = (Words: string): Api.Custom.VMStatisticsCharCount => {
  //参考自：http://www.mingmu.net/zishu.html
  var W: { [key: string]: any } = {}
  var Result = new Array()
  var iNumwords = 0
  var sNumwords = 0
  var sTotal = 0 //双字节字符;
  var iTotal = 0 //中文字符；
  var eTotal = 0 //Ｅ文字符
  var otherTotal = 0
  var bTotal = 0
  var inum = 0

  for (let i = 0; i < Words.length; i++) {
    var c = Words.charAt(i)
    if (c.match(/[\u4e00-\u9fa5]/)) {
      if (isNaN(W[c])) {
        iNumwords++
        W[c] = 1
      }
      iTotal++
    }
  }

  for (let i = 0; i < Words.length; i++) {
    var c = Words.charAt(i)
    if (c.match(/[^\x00-\xff]/)) {
      if (isNaN(W[c])) {
        sNumwords++
      }
      sTotal++
    } else {
      eTotal++
    }
    if (c.match(/[0-9]/)) {
      inum++
    }
  }

  return {
    zhongwen: iTotal, //中文
    yingwen: eTotal, //英文
    shuzi: inum, //数字
    zbiaodian: sTotal, //中文+标点：
    zishu: inum + iTotal, //中文+数字：
    numwords: iTotal * 2 + (sTotal - iTotal) * 2 + eTotal //共记字符总数：字符(汉字算两个字符，数字、空格、英文字母算做一个字符)
  }
}

/**
 * 根据模板代码生成
 */
const generateBasedOnTemplate = (arrSourse: string[], templateCode: string): string => {
  let result = ''
  for (let i = 0; i < arrSourse.length; i++) {
    const line = arrSourse[i].trim()
    const kps = line && line.split('\t')
    result += templateCode.format(kps) + '\n'
  }
  return result
}

export { statisticsCharCount, generateBasedOnTemplate }
