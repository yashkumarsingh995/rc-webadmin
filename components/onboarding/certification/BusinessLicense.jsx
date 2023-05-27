import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid, Typography, MenuItem } from '@mui/material'

import { useStore } from '../../../stores/OnBoardStore'
import { adminUpdateProfile } from '../../../services/Admin'
import { CssTextField } from '../../base/CssTextField'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { rootOnboarding } from '../../../static/Roots'
import { Toolbar } from '../../base/Toolbar'
import { isNotEmpty, phoneNumberIsValid } from '../../helpers/Main'
import { formIsValid } from '../../helpers/Validation'
import ProgressButton from '../../base/ProgressButton'
import svgAttach from '../../../assets/images/icon-invoice-2.svg'
import { usStates } from '../../../services/Common'
import { convertPhoneNumberToString, convertToValidPhoneNumber } from '../../helpers/Formatter'

const BusinessLicense = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { strState, companyName } = store.currentUser

  const { businessState = strState, businessInsCompany = "",
    businessAgentPhone = "", businessPolicyNo = "", businessInsName = companyName,
    businessEffD1 = "", businessEffD2 = "", fileBusinessLicenseImg = "" } = store.currentUser

  const phoneFormatted = convertToValidPhoneNumber(businessAgentPhone)

  const userInit = {
    businessState, businessInsCompany,
    businessAgentPhone: phoneFormatted, businessPolicyNo,
    businessInsName, businessEffD1, businessEffD2, fileBusinessLicenseImg
  }
  const errorInit = {
    businessState: '', businessInsCompany: '',
    businessAgentPhone: '', businessPolicyNo: '', businessInsName: '',
    businessEffD1: '', businessEffD2: ''
  }

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
    const newError = isV ? { ...objError, [name]: '' } : (currField ? { ...objError, [name]: currField.tooltip } : { ...objError, [name]: 'Value cannot be empty' })

    const { text, isValid: formValid } = formIsValid(newUserData, newError, fields)
    setFormValidationInfo(text)
    setHasValidationIssues(!formValid)

    store.saveUserInfo(newUserData)
    setObjUser(newUserData)
    setObjError(newError)
  }

  const onTextChange = (e) => {
    const text = e.target.value
    const newData = {
      ...objUser,
      ['businessAgentPhone']: convertPhoneNumberToString(text)
    }

    const currField = fields.filter(f => (f.id === 'businessAgentPhone'))[0]
    // check for errors
    const isFieldValid = currField.validate ? currField.validate(text) : true

    if (isFieldValid) {
      setObjError({ ...objError, ['businessAgentPhone']: '' })
      setFormValidationInfo('')
      setHasValidationIssues(false)
    }
    else {
      setObjError({ ...objError, ['businessAgentPhone']: currField.tooltip })
      setFormValidationInfo('Please fix errors')
      setHasValidationIssues(true)
    }

    store.saveUserInfo(newData)
    setObjUser(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    store.saveUserInfo(objUser)

    setLoading(true)

    const res = await adminUpdateProfile({
      // TODO: sync property name with mobile app
      // insurance: {
      business: {
        // TODO: sync property name with mobile app
        // insuredName: objUser.businessInsName,
        insuranceName: objUser.businessInsName,
        agentPhone: objUser.businessAgentPhone,
        policyNumber: objUser.businessPolicyNo,
        insuranceCompany: objUser.businessInsCompany,
        insuranceState: objUser.businessState,
        insuranceStartDate: objUser.businessEffD1,
        insuranceEndDate: objUser.businessEffD2,
      }
    })

    setLoading(false)

    if (res && res.error) {
      setApiError(res.error)
      console.log(res.error)
    }
    else {
      navigate(`${rootOnboarding}/bonding`)
    }

  }

  useEffect(() => {
    const { text, isValid: formValid } = formIsValid(objUser, objError, fields)

    setFormValidationInfo(text)
    setHasValidationIssues(!formValid)
  }, [])

  const { businessState: l1, businessInsName: l2,
    businessInsCompany: l3, businessAgentPhone: l4,
    businessPolicyNo: l5, businessEffD1: l6, businessEffD2: l7 } = staticContent.formLabels

  const { businessState: t1, businessInsName: t2,
    businessInsCompany: t3, businessAgentPhone: t4,
    businessPolicyNo: t5, businessEffD1: t6, businessEffD2: t7 } = staticContent.formTooltips

  const fields = [
    { id: 'businessInsName', value: objUser.businessInsName, validate: isNotEmpty, label: l2, tooltip: t2, placeholder: '', type: 'text', isRequired: true },
    { id: 'businessInsCompany', value: objUser.businessInsCompany, validate: isNotEmpty, label: l3, tooltip: t3, placeholder: '', type: 'text', isRequired: true },
    { id: 'businessAgentPhone', value: objUser.businessAgentPhone, validate: phoneNumberIsValid, label: l4, tooltip: t4, placeholder: '', type: 'text', isRequired: true, extraProps: { inputProps: { maxLength: 14 } } },
    { id: 'businessPolicyNo', value: objUser.businessPolicyNo, validate: isNotEmpty, label: l5, tooltip: t5, placeholder: '', type: 'text', isRequired: true },
    { id: 'businessEffD1', value: objUser.businessEffD1, validate: isNotEmpty, label: l6, tooltip: t6, placeholder: '', type: 'date', isRequired: true },
    { id: 'businessEffD2', value: objUser.businessEffD2, validate: isNotEmpty, label: l7, tooltip: t7, placeholder: '', type: 'date', isRequired: true },
  ]

  const hiddenFileInputImg = useRef(null)
  const hiddenFileInputPdf = useRef(null)

  const handleImageClick = event => {
    hiddenFileInputImg.current.click()
  }

  const handlePdfClick = event => {
    hiddenFileInputPdf.current.click()
  }

  const handleChangeImg = event => {
    const fileUploaded = event.target.files[0]
    const newUser = { ...objUser, ['fileBusinessLicenseImg']: fileUploaded.name }
    setObjUser(newUser)
  }

  const handleChangePdf = event => {
    const fileUploaded = event.target.files[0]
    const newUser = { ...objUser, ['fileBusinessLicensePdf']: fileUploaded.name }
    setObjUser(newUser)
  }

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar
        label='Setup: certification' value={store.setupProgress}
        navigateBack='/state-license'>
      </Toolbar>

      <div className={styles['form-subheading']}>{staticContent.businessInsuranceInformation}</div>

      <div className={styles['form-container']}>

        <form style={{ width: '100%' }} onSubmit={handleSubmit}>

          <CssTextField
            id='businessState' label={l1} required={true} type='text'
            value={objUser.businessState}
            onChange={(e) => handleChange(e, 'businessState')}
            select={true}
            variant='filled'
            sx={{ margin: '5px 0' }}
          >{usStates.map((x, index) => <MenuItem key={index} value={x.abbreviation}>{x.name}</MenuItem>)}</CssTextField>

          {fields.map((f, index) => (
            <div key={`fields-wrapper-${index}`}>
              <div key={`fields-${index}`} className={styles['textfield-flex-parent']}>
                <CssTextField
                  id={f.id} label={f.label} key={index} required={f.isRequired ? true : false}
                  placeholder={f.placeholder}
                  type={f.type} variant='filled'
                  value={f.value}
                  // onChange={(e) => handleChange(e, f.id)}
                  onChange={(f.id === 'businessAgentPhone') ?
                    (e) => onTextChange(e)
                    :
                    (e) => handleChange(e, f.id)
                  }
                  sx={{ margin: '5px 0' }}
                  {...f.extraProps}
                />
              </div>
              {<div className={styles['common-field-err']}>{objError[f.id]}</div>}
            </div>
          ))}

          <div className="file-uploader">
            <Typography variant='subtitle2' color='blueMain' sx={{ p: 0, mt: 2, fontSize: 12 }}>{staticContent.uploadAPhoto}:</Typography>

            {objUser.fileBusinessLicenseImg && <Typography variant='subtitle2' color='blueMain' sx={{ p: 0, mb: 0, fontSize: 10 }}>{objUser.fileBusinessLicenseImg}</Typography>}
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

            {/* {objUser.fileBusinessLicensePdf && <Typography variant='subtitle2' color='blueMain' sx={{ p: 0, mb: 0, fontSize: 10 }}>{objUser.fileBusinessLicensePdf}</Typography>}
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
              tooltip={formValidationInfo}
              variant='contained'
              // TODO: make file upload required when it is implemented
              // disabled={hasValidationIssues || (!objUser['fileBusinessLicenseImg'] && !objUser['fileBusinessLicensePdf']) || !objUser.businessState}
              disabled={hasValidationIssues}
              sx={{ mb: 2 }}
            >{staticContent.continue}</ProgressButton>
          </div>
        </form>
      </div>
    </Grid>
  )
})

export default BusinessLicense
