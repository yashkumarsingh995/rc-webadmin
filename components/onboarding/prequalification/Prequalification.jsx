import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid, MenuItem } from '@mui/material'

import { useStore } from '../../../stores/OnBoardStore'
import { checkIfUserQualifies } from '../../../services/Qualify'
import BackButton from '../../base/BackButton'
import ProgressButton from '../../base/ProgressButton'
import { CustomCheckbox } from '../../base/CustomCheckbox'
import { CssTextField } from '../../base/CssTextField'
import styles from '../Main.module.css'
import staticContent from '../../../static/Onboarding'
import { emailIsValid } from '../../helpers/Main'
import { usStates } from '../../../services/Common'
import { rootOnboarding } from '../../../static/Roots'

const Prequalification = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { firstName = "", lastName = "", eMail = "", strState = "",
    isLicensed = false, isInsured = false, isAgreeBgCheck = false } = store.currentUser

  const userInit = { firstName, lastName, eMail, strState, isLicensed, isInsured, isAgreeBgCheck }
  const errorInit = { firstName: '', lastName: '', eMail: '', state: '' }

  const [objUser, setObjUser] = useState(userInit)
  const [loading, setLoading] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(!(firstName && lastName && emailIsValid(eMail) && strState))
  const [objError, setObjError] = useState(errorInit);
  const [apiError, setApiError] = useState('')
  const [formValidationInfo, setFormValidationInfo] = useState('');

  const formIsValid = (data) => {

    let i = 0
    while (i < validationNotEmptyFields.length) {

      if (data[validationNotEmptyFields[i].src] === '') {

        setFormValidationInfo(validationNotEmptyFields[i].text)
        setSubmitDisabled(true)

        return false
      }
      else {
        i++
      }
    }

    if (!emailIsValid(data.eMail)) {
      setFormValidationInfo('Email format expected')
      setSubmitDisabled(true)
      return false
    }

    setFormValidationInfo('')
    setSubmitDisabled(false)
    return true
  }

  const isNotEmpty = (value) => {
    return value.trim() ? true : false
  }

  const handleChange = (e, name) => {
    const id = e.target.id ? e.target.id : name
    const newUserData = { ...objUser, [id]: e.target.value }

    // find corresponding validation function
    const currField = fields.filter(f => (f.id === id))[0]
    const isV = currField ? (currField.validate ? currField.validate(e.target.value) : true) : isNotEmpty(e.target.value)
    const newError = isV ? { ...objError, [id]: '' } : (currField ? { ...objError, [id]: currField.tooltip } : { ...objError, [id]: 'value cannot be empty' })

    setObjUser(newUserData)

    formIsValid(newUserData)
    setObjError(newError)
  }

  const handleChangeCheckbox = (e) => {
    setObjUser({ ...objUser, [e.target.id]: e.target.checked })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setApiError('')

    const form = e.currentTarget
    if (form.checkValidity()) {

      store.saveUserInfo(objUser)

      let blnSuccess = false

      setLoading(true)

      try {
        const userPrequalified = await checkIfUserQualifies(objUser)
        console.log('API prequalification result=', userPrequalified)

        const { annual, per_job } = userPrequalified.current_rate
        const { qualify, reasons } = userPrequalified
        store.savePreqalificationResults(annual, per_job, qualify, reasons)

        blnSuccess = qualify

        blnSuccess ?
          navigate(`${rootOnboarding}/prequalification-success`) :
          navigate(`${rootOnboarding}/prequalification-failure`)
      }
      catch (error) {
        // show message on UI
        setApiError('API call failure.')
        setLoading(false)
        console.error('API call failure=', error)
      }
    }
  }

  useEffect(() => {
    const formValid = formIsValid(objUser)
    setSubmitDisabled(!formValid)
  }, [])

  const { firstName: l1, lastName: l2, eMail: l3 } = staticContent.formLabels
  const { firstName: p1, lastName: p2, eMail: p3 } = staticContent.formPlaceholders
  const { firstName: t1, lastName: t2, eMail: t3, state: t4 } = staticContent.formTooltips

  const fields = [
    { id: 'firstName', value: objUser.firstName, validate: isNotEmpty, label: l1, type: 'text', isRequired: true, tooltip: t1, placeholder: p1 },
    { id: 'lastName', value: objUser.lastName, validate: isNotEmpty, label: l2, type: 'text', isRequired: true, tooltip: t2, placeholder: p2 },
    { id: 'eMail', value: objUser.eMail, validate: emailIsValid, label: l3, type: 'email', isRequired: true, tooltip: t3, placeholder: p3 },
  ]

  const validationNotEmptyFields = [
    { src: 'firstName', text: t1 },
    { src: 'lastName', text: t2 },
    { src: 'eMail', text: t3 },
    { src: 'strState', text: t4 },
  ]

  const fieldsCheckbox = [
    { id: 'isLicensed', value: objUser.isLicensed, label: staticContent.myCompanyIsStateLicensed },
    { id: 'isInsured', value: objUser.isInsured, label: staticContent.myCompanyIsInsured },
    { id: 'isAgreeBgCheck', value: objUser.isAgreeBgCheck, label: staticContent.myStaffWillAgree },
  ]

  return (
    <Grid className={styles['fixed-width-container']}>
      <BackButton navigateTo='' color='blueMain' />

      <div className={styles['form-container']}>

        <div className={styles['prequalification-header']}>{staticContent.prequalification}</div>
        <div className={styles['form-heading']}>{staticContent.doIQualify}</div>
        <div className={styles['form-subheading']}>{staticContent.ourTrusted}</div>

        <form noValidate onSubmit={handleSubmit}>

          {fields.map((f, index) => (
            <div key={`fields-wrapper-${index}`}>
              <div key={`fields-${index}`} className={styles['textfield-flex-parent']}>
                <CssTextField
                  id={f.id} label={f.label} key={index} required={f.isRequired ? true : false}
                  placeholder={f.placeholder}
                  type={f.type} variant='filled'
                  value={f.value} onChange={handleChange}
                  sx={{ margin: '5px 0' }}
                />
              </div>
              {<div className={styles['common-field-err']}>{objError[f.id]}</div>}
            </div>
          ))}

          <CssTextField
            id='strState' name='strState' label='State' required={true} type='select'
            placeholder='State'
            value={objUser.strState}
            onChange={(e) => { console.log('onChange'); handleChange(e, 'strState') }}
            onKeyDown={() => { console.log('onKeyDown') }}
            select={true}
            variant='filled'
            sx={{ margin: '5px 0' }}
          >
            {usStates.map((x, index) =>
              <MenuItem key={index} value={x.abbreviation}>{x.name}</MenuItem>
            )}</CssTextField>

          <div className={styles['prequalification-all-apply']}>{staticContent.checkAllThatApply}:</div>

          <div className={styles['checkbox-container']}>
            {fieldsCheckbox.map((f, index) => (
              <CustomCheckbox key={index} id={f.id} required={false} size='medium'
                checked={f.value} onChange={handleChangeCheckbox}
                label={f.label}
                sx={{ margin: '0' }}
              />))
            }
          </div>

          <div className={styles['btn-container-prequalification']}>
            {apiError && <div className={styles['common-api-err']}>Error: {apiError}</div>}
            <ProgressButton
              type="submit"
              // tooltip={formValidationInfo}
              loading={loading}
              color="primary"
              variant="contained"
              sx={{ mb: 2 }}
              disabled={submitDisabled}
            >{staticContent.continue}</ProgressButton>
          </div>
        </form>
      </div>
    </Grid>
  )
})

export default Prequalification