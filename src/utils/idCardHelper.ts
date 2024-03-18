type cardAnalysisType = 'birthDate' | 'sex' | 'age'
//  避免精度丢失 例如 210321198708251611 --> 210321198708251620, 故身份证号类型需为String类型
type cardType = string
/**
 * @description 解析身份证信息
 * @param {String} idCard - 身份证号
 * @param {Number} analysisType - 解析类型（birthDate-出生日期 sex-性别 age-年龄）
 * @return {String}
 */
const getAnalysisIdCard = (
  idCard: cardType,
  analysisType: cardAnalysisType = 'birthDate'
): string | number => {
  const analysisTypeArr: string[] = ['birthDate', 'sex', 'age']
  if (!idCard) {
    throw new Error('传入身份证不能为空！')
  }
  if (!analysisTypeArr.includes(analysisType)) {
    throw new Error('请传入正确的解析类型！')
  }
  if (!validIdCard(idCard)) {
    throw new Error('传入身份证格式有误!')
  }
  const analysisObj = {
    birthDate: (idCard: cardType) => {
      // 获取出生日期
      let birth = '' //`${idCard.substring(6, 10)}-${idCard.substring(10, 12)}-${idCard.substring(12,14)}`;
      if (idCard.length === 18) {
        birth = `${idCard.substring(6, 10)}-${idCard.substring(10, 12)}-${idCard.substring(12, 14)}`
      } else if (idCard.length === 15) {
        birth = `19${idCard.substring(6, 8)}-${idCard.substring(8, 10)}-${idCard.substring(10, 12)}`
      }
      return birth
    },
    sex: (idCard: cardType) => {
      //获取性别
      const sex = parseInt(idCard[16]) % 2 === 1 ? '男' : '女'
      return sex
    },
    age: (idCard: cardType) => {
      //获取年龄(计算周岁，未过今年的生日则不加上一岁)
      const myDate = new Date(),
        month = myDate.getMonth() + 1,
        day = myDate.getDate()
      let age = myDate.getFullYear() - Number(idCard.substring(6, 10)) - 1
      if (
        Number(idCard.substring(10, 12)) < month ||
        (Number(idCard.substring(10, 12)) === month && Number(idCard.substring(12, 14)) <= day)
      ) {
        age++
      }
      return age
    }
  }
  return analysisObj[analysisType](idCard)
}

const validIdCard = (code: cardType) => {
  /*
         根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
         地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
         出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
         顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
         校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

         出生日期计算方法。
         15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
         2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
         下面是正则表达式:
         出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
         身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
         15位校验规则 6位地址编码+6位出生日期+3位顺序号
         18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

         校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
         公式(1)中：
         i----表示号码字符从由至左包括校验码在内的位置序号；
         ai----表示第i位置上的号码字符值；
         Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
         i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
         Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
         */
  //身份证号合法性验证
  //支持15位和18位身份证号
  //支持地址编码、出生日期、校验位验证
  const city: { [key: string | number]: string } = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  let tip = ''
  let pass = true
  const cityCode = code.substring(0, 2)
  if (
    !code ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)
  ) {
    tip = '身份证号格式错误'
    pass = false
  } else if (!city[cityCode]) {
    tip = '地址编码错误'
    pass = false
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      const arrCode = code.split('')
      //∑(ai×Wi)(mod 11)
      //加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      //校验位
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i++) {
        ai = parseInt(arrCode[i])
        wi = factor[i]
        sum += ai * wi
      }
      const last = parity[sum % 11].toString()
      if (last !== arrCode[17].toString()) {
        tip = '校验位错误'
        pass = false
      }
    }
  }
  if (!pass) console.log('身份证号码无效：', tip)
  return pass
}

const isRightIdCardLength = (card: cardType): boolean => {
  // 身份证位数校验，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  const reg = /^\d{17}(\d|X|x)$/
  return reg.test(card)
}

const checkProvince = (card: cardType, cityCodeArr: string[]): boolean => {
  const province = card.slice(0, 2)
  return cityCodeArr.includes(province)
}

const checkBirthday = (card: cardType): boolean => {
  //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
  if (!card || card.length !== 18) {
    return false
  }
  const reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/
  const arrData = card.match(reg)
  if (arrData) {
    const year = arrData[2]
    const month = arrData[3]
    const day = arrData[4]
    const birthday = new Date(year + '/' + month + '/' + day)
    return verifyBirthday(year, month, day, birthday)
  } else {
    return false
  }
}

// 校验日期
const verifyBirthday = (year: string, month: string, day: string, birthday: any): boolean => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  //年月日是否合理
  if (
    birthday.getFullYear() === year &&
    birthday.getMonth() + 1 === month &&
    birthday.getDate() === day
  ) {
    //判断年份的范围（0岁到100岁之间)
    const time = currentYear - Number(year)
    if (time >= 0 && time <= 100) {
      return true
    }
    return false
  }
  return false
}

// 检测校验位
const checkParity = (card: cardType): boolean => {
  // 第一代居民身份证(15位)已经于2013年1月1日正式退出
  // 故不做15位转18位换算
  if (card.length < 18) {
    return false
  }
  const arrInt: number[] = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const arrCh: string[] = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let cardTemp: number = 0
  for (let i = 0; i < 17; i++) {
    cardTemp += Number(card.slice(i, i + 1)) * arrInt[i]
  }
  const checkBit = arrCh[cardTemp % 11]
  if (checkBit === card.slice(17).toLocaleUpperCase()) {
    return true
  }
  return false
}

export default {
  checkParity,
  getAnalysisIdCard,
  validIdCard,
  checkProvince,
  isRightIdCardLength,
  checkBirthday
}
