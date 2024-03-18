type IDCardFormat = string

function isValidIDCard(id: string): boolean {
  // 简单的合法性校验，实际场景下应使用更复杂的校验逻辑
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(id)
}

function generateRandomAreaCode(): string {
  const areaCodes: string[] = [
    '11',
    '12',
    '13',
    '14',
    '15',
    '21',
    '22',
    '23',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '50',
    '51',
    '52',
    '53',
    '54',
    '61',
    '62',
    '63',
    '64',
    '65',
    '71',
    '81',
    '82',
    '91'
  ]
  return areaCodes[Math.floor(Math.random() * areaCodes.length)]
}

function calculateCheckCode(idWithoutCheck: string): string {
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum +=
      parseInt(idWithoutCheck.charAt(i), 10) * (i % 2 === 0 ? 7 - i / 2 : Math.floor(9 - i / 2))
  }
  const mod = sum % 11
  return mod === 2 ? 'X' : String(11 - mod)
}

function generateRandomIDCard(): IDCardFormat {
  const areaCode = generateRandomAreaCode()
  const randomBirthDate =
    '19' +
    Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, '0') +
    '-' +
    '0123456789'.charAt(Math.floor(Math.random() * 10)) +
    '-' +
    '0123456789'.substring(0, 3).replace(/./g, () => String(Math.floor(Math.random() * 10)))
  const randomSequence = '0123456789'
    .substring(0, 4)
    .replace(/./g, () => String(Math.floor(Math.random() * 10)))
  const checkCode = calculateCheckCode(areaCode + randomBirthDate + randomSequence)

  return `${areaCode}${randomBirthDate}${randomSequence}${checkCode}`
}

// 生成20个严格格式验证的随机身份证号
const fakeIDs: IDCardFormat[] = []
for (let i = 0; i < 20; i++) {
  const id = generateRandomIDCard()
  if (isValidIDCard(id)) {
    fakeIDs.push(id)
  } else {
    // 在此示例中，generateRandomIDCard 应该总是生成有效格式的号码，此处仅为保险起见
    // console.error('生成的身份证号码无效，请检查生成逻辑')
    // console.log('error：idcard is invalid！')
  }
}

console.log(fakeIDs)
