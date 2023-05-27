const formIsValid = (data, errObj, fields) => {

  // console.log(`${data}`)
  // console.log(`${errObj}`)
  // console.log(`${fields.length}`)

  // TODO important: rewrite

  // check errors that are already on UI
  // check current objError object and return first error
  const uiError = Object.values(errObj).find((value) => value)

  if (uiError) {
    // return 1st one
    return { text: uiError, isValid: false }
  }
  else {
    for (let i = 0; i < fields.length; i++) {
      const isValid = fields[i].validate ? fields[i].validate(data[fields[i].id]) : true

      if (!isValid) {
        const text = fields[i].tooltip
        return { text, isValid: false }
      }

    }
    return { text: '', isValid: true }
  }
}

export { formIsValid }