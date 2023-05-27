import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

import { useStore } from '../../../stores/OnBoardStore'
import { CssTextField } from '../../base/CssTextField'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { rootOnboarding } from '../../../static/Roots'
import { Toolbar } from '../../base/Toolbar'
import { isNotEmpty } from '../../helpers/Main'
import { formIsValid } from '../../helpers/Validation'
import ProgressButton from '../../base/ProgressButton'
import { adminUpdateProfile } from '../../../services/Admin'
import svgAttach from '../../../assets/images/icon-invoice-2.svg'

const StateLicense = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { stateLicenseNumber = '', fileStateLicenseImg = '' } = store.currentUser

  const userInit = { stateLicenseNumber, fileStateLicenseImg }
  const errorInit = { stateLicenseNumber: '' }

  const [objUser, setObjUser] = useState(userInit)
  const [loading, setLoading] = useState(false)
  const [objError, setObjError] = useState(errorInit);
  const [apiError, setApiError] = useState('')

  const [hasValidationIssues, setHasValidationIssues] = useState(false)
  const [formValidationInfo, setFormValidationInfo] = useState('')

  const handleChange = (e, name) => {
    const newUserData = { ...objUser, [name]: e.target.value }

    // find corresponding validation function
    const currField = fields.filter(f => (f.id === name))[0]
    const isV = currField ? (currField.validate ? currField.validate(e.target.value) : true) : isNotEmpty(e.target.value)
    const newError = isV ? { ...objError, [name]: '' } : (currField ? { ...objError, [name]: currField.tooltip } : { ...objError, [name]: 'value cannot be empty' })

    const { text, isValid: formValid } = formIsValid(newUserData, newError, fields)
    setFormValidationInfo(text)
    setHasValidationIssues(!formValid)

    store.saveUserInfo(newUserData)
    setObjUser(newUserData)
    setObjError(newError)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    store.saveUserInfo(objUser)

    setLoading(true)
    const res = await adminUpdateProfile({
      license: {
        licenseNumber: objUser.stateLicenseNumber,
      }
    })
    setLoading(false)

    if (res && res.error) {
      setApiError(res.error)
      console.log(res.error)
    }
    else {
      navigate(`${rootOnboarding}/business-license`)
    }
  }

  useEffect(() => {
    const { text, isValid: formValid } = formIsValid(objUser, objError, fields)

    setFormValidationInfo(text)
    setHasValidationIssues(!formValid)
  }, [])

  const { stateLicenseNumber: l1 } = staticContent.formLabels
  const { stateLicenseNumber: t1 } = staticContent.formTooltips

  const fields = [
    { id: 'stateLicenseNumber', value: objUser.stateLicenseNumber, validate: isNotEmpty, label: l1, tooltip: t1, type: 'text', isRequired: true },
  ]

  const hiddenFileInputImg = useRef(null)
  const hiddenFileInputPdf = useRef(null)

  const handleImageClick = event => {
    console.log('button - ImageClick')
    hiddenFileInputImg.current.click()
  }

  const handlePdfClick = event => {
    console.log('button - PdfClick')
    hiddenFileInputPdf.current.click()
  }

  const handleChangeImg = event => {
    console.log('hidden input - Img')
    const fileUploaded = event.target.files[0]
    const newUser = { ...objUser, ['fileStateLicenseImg']: fileUploaded.name }
    setObjUser(newUser)
  }

  const handleChangePdf = event => {
    console.log('hidden input - Pdf')
    const fileUploaded = event.target.files[0]
    const newUser = { ...objUser, ['fileStateLicensePdf']: fileUploaded.name }
    setObjUser(newUser)
  }

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar
        label='Setup: certification' value={store.setupProgress}
        navigateBack='/update-company-info'>
      </Toolbar>

      <div className={styles['form-subheading']}>{staticContent.licenseInformation}</div>

      <div className={styles['form-container']}>

        <form style={{ width: '100%' }} onSubmit={handleSubmit}>

          {fields.map((f, index) => (
            <div key={`fields-wrapper-${index}`}>
              <div key={`fields-${index}`} className={styles['textfield-flex-parent']}>
                <CssTextField
                  id={f.id} label={f.label} key={index} required={f.isRequired ? true : false}
                  placeholder={f.placeholder}
                  type={f.type} variant='filled'
                  value={f.value}
                  onChange={(e) => handleChange(e, f.id)}
                  sx={{ margin: '5px 0' }}
                />
              </div>
              {<div className={styles['common-field-err']}>{objError[f.id]}</div>}
            </div>
          ))}

          <div className="file-uploader">
            <Typography variant='subtitle2' color='blueMain' sx={{ p: 0, mt: 2, fontSize: 12 }}>{staticContent.uploadAPhoto}:</Typography>

            {objUser.fileStateLicenseImg && <Typography variant='subtitle2' color='blueMain' sx={{ p: 0, mb: 0, fontSize: 10 }}>{objUser.fileStateLicenseImg}</Typography>}
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg, application/pdf"
              ref={hiddenFileInputImg}
              onChange={handleChangeImg}
              className={styles['common-hidden-input']}
            />
            <ProgressButton
              color='primary'
              variant='outlined'
              sx={{ mb: 2, fontFamily: 'LatoBold' }}
              onClick={handleImageClick}
              svg={svgAttach}
            >{staticContent.upload}</ProgressButton>

            {/* {objUser.fileStateLicensePdf && <Typography variant='subtitle2' color='blueMain' sx={{ p: 0, mb: 0, fontSize: 10 }}>{objUser.fileStateLicensePdf}</Typography>}
            <input
              type="file"
              accept="application/pdf"
              ref={hiddenFileInputPdf}
              onChange={handleChangePdf}
              className={styles['common-hidden-input']}
            />
            <ProgressButton
              color='primary'
              variant='outlined'
              sx={{ mb: 2, fontFamily: 'LatoBold' }}
              onClick={handlePdfClick}
              svg={svgAttach}
            >{staticContent.uploadPDF}</ProgressButton> */}

          </div>
          <div className={styles['btn-container']}>
            {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}
            <ProgressButton type='submit'
              loading={loading}
              color='primary'
              // tooltip={formValidationInfo}
              variant='contained'
              // TODO: make file upload required when it is implemented
              // disabled={hasValidationIssues || (!objUser['fileStateLicenseImg'] && !objUser['fileStateLicensePdf'])}
              disabled={hasValidationIssues}
              sx={{ mb: 2 }}
            >{staticContent.continue}</ProgressButton>
          </div>
        </form>

      </div>
    </Grid>
  )
})

export default StateLicense
