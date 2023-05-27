import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid, Typography } from '@mui/material'

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
import { convertPhoneNumberToString, convertToValidPhoneNumber } from '../../helpers/Formatter'

const Bonding = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { companyName = '' } = store.currentUser

  const { bondingInsName = companyName, bondingInsCompany = '',
    bondingAgentPhone = '', bondingPolicyNo = '',
    bondingAmount = '', bondingEffD1 = '', bondingEffD2 = '', fileBondingImg = '' } = store.currentUser

  const phoneFormatted = convertToValidPhoneNumber(bondingAgentPhone)

  const userInit = {
    bondingInsName, bondingInsCompany,
    bondingAgentPhone: phoneFormatted, bondingPolicyNo,
    bondingAmount, bondingEffD1, bondingEffD2, fileBondingImg
  }
  const errorInit = {
    bondingInsName: '', bondingInsCompany: '',
    bondingAgentPhone: '', bondingPolicyNo: '',
    bondingAmount: '', bondingEffD1: '', bondingEffD2: ''
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
      ['bondingAgentPhone']: convertPhoneNumberToString(text)
    }

    const currField = fields.filter(f => (f.id === 'bondingAgentPhone'))[0]
    // check for errors
    const isFieldValid = currField.validate ? currField.validate(text) : true

    if (isFieldValid) {
      setObjError({ ...objError, ['bondingAgentPhone']: '' })
      setFormValidationInfo('')
      setHasValidationIssues(false)
    }
    else {
      setObjError({ ...objError, ['bondingAgentPhone']: currField.tooltip })
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
      bonding: {
        bondingName: objUser.bondingInsName,
        agentPhone: objUser.bondingAgentPhone,
        policyNumber: objUser.bondingPolicyNo,
        bondingCompany: objUser.bondingInsCompany,
        bondAmount: objUser.bondingAmount,
        bondingStartDate: objUser.bondingEffD1,
        bondingEndDate: objUser.bondingEffD2,
      }
    })

    setLoading(false)

    if (res && res.error) {
      setApiError(res.error)
      console.log(res.error)
    }
    else {
      navigate(`${rootOnboarding}/attestation-of-accuracy`)
    }

  }

  useEffect(() => {
    const { text, isValid: formValid } = formIsValid(objUser, objError, fields)

    setFormValidationInfo(text)
    setHasValidationIssues(!formValid)
  }, [])

  const { bondingInsName: l1, bondingInsCompany: l2,
    bondingAgentPhone: l3, bondingPolicyNo: l4,
    bondingAmount: l5, bondingEffD1: l6, bondingEffD2: l7 } = staticContent.formLabels

  const { bondingInsName: t1, bondingInsCompany: t2,
    bondingAgentPhone: t3, bondingPolicyNo: t4,
    bondingAmount: t5, bondingEffD1: t6, bondingEffD2: t7 } = staticContent.formTooltips

  const fields = [
    { id: 'bondingInsName', value: objUser.bondingInsName, validate: isNotEmpty, label: l1, tooltip: t1, placeholder: '', type: 'text', isRequired: true },
    { id: 'bondingInsCompany', value: objUser.bondingInsCompany, validate: isNotEmpty, label: l2, tooltip: t2, placeholder: '', type: 'text', isRequired: true },
    { id: 'bondingAgentPhone', value: objUser.bondingAgentPhone, validate: phoneNumberIsValid, label: l3, tooltip: t3, placeholder: '', type: 'text', isRequired: true, extraProps: { inputProps: { maxLength: 14 } } },
    // { id: 'businessAgentPhone', value: objUser.businessAgentPhone, validate: phoneNumberIsValid, label: l4, tooltip: t4, placeholder: '', type: 'text', isRequired: true, extraProps: { inputProps: { maxLength: 14 } } },
    { id: 'bondingPolicyNo', value: objUser.bondingPolicyNo, validate: isNotEmpty, label: l4, tooltip: t4, placeholder: '', type: 'text', isRequired: true },
    { id: 'bondingAmount', value: objUser.bondingAmount, validate: isNotEmpty, label: l5, tooltip: t5, placeholder: '', type: 'text', isRequired: true },
    { id: 'bondingEffD1', value: objUser.bondingEffD1, validate: isNotEmpty, label: l6, tooltip: t6, placeholder: '', type: 'date', isRequired: true },
    { id: 'bondingEffD2', value: objUser.bondingEffD2, validate: isNotEmpty, label: l7, tooltip: t7, placeholder: '', type: 'date', isRequired: true },
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
    const newUser = { ...objUser, ['fileBondingImg']: fileUploaded.name }
    setObjUser(newUser)
  }

  const handleChangePdf = event => {
    const fileUploaded = event.target.files[0]
    const newUser = { ...objUser, ['fileBondingPdf']: fileUploaded.name }
    setObjUser(newUser)
  }

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar
        label='Setup: certification' value={store.setupProgress}
        navigateBack='/business-license'>
      </Toolbar>

      <div className={styles['form-subheading']}>{staticContent.bondingInformation}</div>

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
                  // onChange={(e) => handleChange(e, f.id)}
                  onChange={(f.id === 'bondingAgentPhone') ?
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

            {objUser.fileBondingImg && <Typography variant='subtitle2' color='blueMain' sx={{ p: 0, mb: 0, fontSize: 10 }}>{objUser.fileBondingImg}</Typography>}
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

            {/* {objUser.fileBondingPdf && <Typography variant='subtitle2' color='blueMain' sx={{ p: 0, mb: 0, fontSize: 10 }}>{objUser.fileBondingPdf}</Typography>}
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
              // disabled={hasValidationIssues || (!objUser['fileBondingImg'] && !objUser['fileBondingPdf'])}
              disabled={hasValidationIssues}
              sx={{ mb: 2 }}
            >{staticContent.continue}</ProgressButton>
          </div>

        </form>

      </div>
    </Grid>
  )
})

export default Bonding
