//通过 ts 自动生成20个严格验证的身份证号码
function generateRandomIdCards() {
  const idCards = []
  for (let i = 0; i < 20; i++) {
    const idCard = generateRandomIdCard()
    idCards.push(idCard)
  }
  return idCards
}

function generateRandomIdCard() {
  const areaCode = generateRandomAreaCode()
  const birthday = generateRandomBirthday()
  const checkCode = generateRandomCheckCode()
  return `${areaCode}${birthday}${checkCode}`
}

function generateRandomAreaCode() {
  const areaCodes = [
    '110000',
    '120000',
    '130000',
    '140000',
    '150000',
    '160000',
    '170000',
    '180000',
    '210000',
    '220000',
    '230000',
    '310000',
    '320000',
    '330000',
    '340000',
    '350000',
    '360000',
    '370000',
    '410000',
    '420000',
    '430000',
    '440000',
    '450000',
    '460000',
    '500000',
    '510000',
    '520000',
    '530000',
    '540000',
    '610000',
    '620000',
    '630000',
    '640000',
    '650000',
    '710000',
    '810000',
    '910000'
  ]
  return areaCodes[Math.floor(Math.random() * areaCodes.length)]
}

function generateRandomBirthday() {
  const year = Math.floor(Math.random() * (2022 - 1900 + 1)) + 1900
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1 // Considering leap years
  return `${year}${month}${day}`
}

// function generateRandomCheckCode() {
//   const checkCodes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'Y', 'Z']
//   const sum = (number) => (number * 7) % 11
//   let sumOfDigits = 0
//   for (let i = 17; i >= 11; i--) {
//     const digit = checkCodes[sum(sumOfDigits) % 11]
//     sumOfDigits += parseInt(digit, 10)
//   }
//   return checkCodes[sum(sumOfDigits) % 11]
// }
// 检测校验位
const generateRandomCheckCode = (card) => {
  // 第一代居民身份证(15位)已经于2013年1月1日正式退出
  // 故不做15位转18位换算
  if (card.length < 18) {
    return false
  }
  const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let cardTemp = 0
  for (let i = 0; i < 17; i++) {
    cardTemp += Number(card.slice(i, i + 1)) * arrInt[i]
  }
  return arrCh[cardTemp % 11]
}



function isValidIDCard(id) {
  // 简单的合法性校验，实际场景下应使用更复杂的校验逻辑
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(id)
}


// 生成20个严格格式验证的随机身份证号
const fakeIDs = []
for (let i = 0; i < 20; i++) {
  const id = generateRandomIdCard()
  console.log("id", id)
  if (isValidIDCard(id)) {
    fakeIDs.push(id)
  } else {
    // 在此示例中，generateRandomIDCard 应该总是生成有效格式的号码，此处仅为保险起见
    console.error('生成的身份证号码无效，请检查生成逻辑')
    // console.log('error：idcard is invalid！')
  }
}

console.log(fakeIDs)