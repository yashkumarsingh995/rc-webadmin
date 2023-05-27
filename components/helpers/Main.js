const emailIsValid = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const passwordIsValid = (password) => {
  // between 12 to 30 characters which contain at least:
  // one lowercase letter
  // one uppercase letter
  // one numeric digit
  // and one special character
  return String(password)
    .match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,30}$/
    )
}

const phoneNumberIsValid = (phoneNumber) => {
  // leave only numeric characters

  if (!phoneNumber) return false
  const noGlobalCode = phoneNumber?.replace('+1', '')
  // leave only numeric characters
  if (!String(noGlobalCode).match(/^[0-9( )-\s]*$/)) return false
  const short = noGlobalCode.replace(/\D+/g, '')
  return (short.length === 10)
}

const passwordsMatch = (value1, value2) => {
  return (value1 === value2)
}

const validZip = (zip) => {
  if (!String(zip).match(/^[0-9]*$/)) return false
  return (zip.length === 5)
}

const isNotEmpty = (value) => {
  if (!value) return false
  return value.trim() ? true : false
}

const atLeastOneLetter = (value) => {
  if (!value) return false
  if (String(value).match(/^[a-zA-Z].*/)) return true
}

const isTrue = (value) => {
  return value === true
}

export {
  emailIsValid, passwordIsValid, phoneNumberIsValid,
  passwordsMatch, validZip, isNotEmpty, atLeastOneLetter, isTrue
}