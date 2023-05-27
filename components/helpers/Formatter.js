export function convertToValidPhoneNumber(text) {

  // console.log(`text in=${text}`)
  const noGlobalCode = text.replace('+1', '')
  const noFormatting = noGlobalCode.replace(/\D+/g, '')
  if (!noFormatting) return ''
  const npa = noFormatting.substring(0, 3)
  const nxx = noFormatting.substring(3, 6)
  const last4 = noFormatting.substring(6, 10)

  // console.log(`text out=${`(${npa}) ${nxx}-${last4}`}`)
  return `(${npa}) ${nxx}-${last4}`
}

export function numbersOnly(text) {
  if (!text) return ''
  return text.replace(/\D+/g, '')
}

export function convertPhoneNumberToString(text) {
  if (!text) return ''
  let cleaned = text.replace('+1 ', '')
  cleaned = cleaned.replace(/\D+/g, '')
  if (!cleaned) {
    return ''
  }

  const areaCode = cleaned.substring(0, 3)
  const middle = cleaned.substring(3, 6)
  const last = cleaned.substring(6, 10)

  if (cleaned.length > 6) {
    return `(${areaCode}) ${middle}-${last}`
  }

  if (cleaned.length > 3) {
    return `(${areaCode}) ${middle}`
  }

  if (cleaned.length > 0) {
    return `(${areaCode}`
  }

  return ''
}