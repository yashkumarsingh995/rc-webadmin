import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid, MenuItem } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { rootOnboarding, rootAdmin } from '../../../static/Roots'
import { useStore } from '../../../stores/OnBoardStore'
import ProgressButton from '../../base/ProgressButton'
import { CssTextField } from '../../base/CssTextField'
import { CustomCheckbox } from '../../base/CustomCheckbox'
import { Toolbar } from '../../base/Toolbar'
import styles from '../Main.module.css'
import { adminCreateUser, adminGetCurrentUser } from '../../../services/Admin'
import { signIn, signOut } from '../../../services/Aws'
import { emailIsValid, passwordIsValid, phoneNumberIsValid, atLeastOneLetter } from '../../helpers/Main'
import staticContent from '../../../static/Onboarding'
import { formIsValid } from '../../helpers/Validation'
import { convertPhoneNumberToString, convertToValidPhoneNumber, numbersOnly } from '../../helpers/Formatter'
import { DEBUG } from '../../helpers/Debug'
import { termsOfService, privacyPolicy } from '../../../static/TermsAndConditions'
import { WebModal } from '../../base/WebModal'

const CreateAccount = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { firstName, lastName, eMail, phone = "",
    password = "" } = store.currentUser

  const phoneFormatted = convertToValidPhoneNumber(phone)

  const userInit = {
    firstName, lastName, eMail, phoneNumber: phoneFormatted, password
  }
  const errorInit = {
    firstName: '', lastName: '', eMail: '', phoneNumber: '',
    password: ''
  }

  const [objUser, setObjUser] = useState(userInit)
  const [objError, setObjError] = useState(errorInit)

  const [agree, setAgree] = useState(false)

  const [modalShow, setModalShow] = useState(false)
  const [modalShowData, setModalShowData] = useState({})
  const [html, setHtml] = useState('')

  const [incorrectUserOrPassword, setIncorrectUserOrPassword] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [hasValidationIssues, setHasValidationIssues] = useState(false)
  const [formValidationInfo, setFormValidationInfo] = useState('')

  const { firstName: l1, lastName: l2, eMail: l3, phone: l4,
    password: l5 } = staticContent.formLabels
  const { firstName: t1, lastName: t2, eMail: t3, phone: t4,
    password: t5 } = staticContent.formTooltips

  const fields = [
    { id: 'firstName', value: objUser.firstName, validate: atLeastOneLetter, label: l1, type: 'text', tooltip: t1, helperText: '', isRequired: true },
    { id: 'lastName', value: objUser.lastName, validate: atLeastOneLetter, label: l2, type: 'text', tooltip: t2, helperText: '', isRequired: true },
    { id: 'eMail', value: objUser.eMail, validate: emailIsValid, label: l3, type: 'email', tooltip: t3, helperText: '', isRequired: true },
    { id: 'phoneNumber', value: objUser.phoneNumber, validate: phoneNumberIsValid, label: l4, type: 'text', tooltip: t4, helperText: '', isRequired: true, extraProps: { inputProps: { maxLength: 14 } } },
    { id: 'password', value: objUser.password, validate: passwordIsValid, label: l5, type: 'password', tooltip: t5, helperText: '', isRequired: true, hasIcon: true },
  ]

  useEffect(() => {
    const { text, isValid } = formIsValid(objUser, objError, fields)
    setFormValidationInfo(text)
    setHasValidationIssues(!isValid)
  }, [])

  const handleChange = (e) => {
    if (apiError) {
      setApiError('')
    }
    const newData = { ...objUser, [e.target.id]: e.target.value }

    // find corresponding validation function
    const currField = fields.filter(f => (f.id === e.target.id))[0]

    const isFieldValid = currField.validate ? currField.validate(e.target.value) : true

    let newError
    if (isFieldValid) {
      newError = { ...objError, [e.target.id]: '' }
    }
    else {
      newError = { ...objError, [e.target.id]: currField.tooltip }
    }

    // console.log('newData=', newData)
    const { text, isValid } = formIsValid(newData, newError, fields)

    console.log('isValid=', isValid, text)
    setFormValidationInfo(text)
    setHasValidationIssues(!isValid)

    store.saveUserInfo(newData)
    setObjUser(newData)
    setObjError(newError)
  }

  const onTextChange = (e) => {
    const text = e.target.value
    const newData = {
      ...objUser,
      ['phoneNumber']: convertPhoneNumberToString(text)
    }

    const currField = fields.filter(f => (f.id === 'phoneNumber'))[0]
    // check for errors
    const isFieldValid = currField.validate ? currField.validate(text) : true

    if (isFieldValid) {
      setObjError({ ...objError, ['phoneNumber']: '' })
      setFormValidationInfo('')
      setHasValidationIssues(false)
    }
    else {
      setObjError({ ...objError, ['phoneNumber']: currField.tooltip })
      setFormValidationInfo('Please fix errors')
      setHasValidationIssues(true)
    }

    // const uiError = Object.values(errObj).find((value) => value)

    store.saveUserInfo(newData)
    setObjUser(newData)
  }

  const handleChangeCheckbox = (e) => {
    setAgree(e.target.checked)
  }

  const handleTermsOfService = () => {
    setHtml('terms')
    setModalShowData(termsOfService)
    setModalShow(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget
    if (!form.checkValidity()) {
      return
    }

    setLoading(true)

    store.saveUserInfo(objUser)

    let incorrectUserException = false
    // const res = await installerCreateUser(objUser)
    // console.log('res=', res)

    // sign out first
    console.log(`----->LOGOUT`)
    try {
      const logoutRes = await signOut()
      if (logoutRes && !logoutRes.error) {
        console.log('logged out')
      }
    }
    catch (error) {
      // do not report error, try to log in
      console.log('logged error')
    }

    // try to sign in
    console.log(`----->LOGIN TRY`)
    try {
      const loginRes = await signIn(objUser.eMail, objUser.password)
      // console.log(`----->loginRes2= ${JSON.stringify(loginRes)}`)
      if (loginRes && !loginRes.error) {
        console.log('success')
      }
      else {
        console.log('LOGIN ERROR=====', loginRes.error)
        incorrectUserException = true
        setIncorrectUserOrPassword(true)
      }
    }
    catch (error) {
      // do not report error, try to create account
    }

    try {
      // read user data from API
      const userData = await adminGetCurrentUser()
      if (userData && !userData.error) {
        console.log(`----->EXISTING USER API= ${JSON.stringify(userData)}`)

        // create user to save it to local store
        const {
          Username: username = "",
          company: companyName = "",
          phone_number: phoneNumber = "",
          address_one: addressLine1 = "",
          address_two: addressLine2 = "",
          city = "",
          zip = "",
          ein = "",
          state: strState = "",
        } = userData

        const { licenseNumber: stateLicenseNumber = "" } = userData.license || {}
        const {
          insuranceName: businessInsName = "",
          agentPhone: businessAgentPhone = "",
          policyNumber: businessPolicyNo = "",
          insuranceCompany: businessInsCompany = "",
          insuranceState: businessState = "",
          insuranceStartDate: businessEffD1 = "",
          insuranceEndDate: businessEffD2 = ""
        } = userData.business || {}

        const {
          bondingName: bondingInsName = "",
          agentPhone: bondingAgentPhone = "",
          policyNumber: bondingPolicyNo = "",
          bondingCompany: bondingInsCompany = "",
          bondAmount: bondingAmount = "",
          bondingStartDate: bondingEffD1 = "",
          bondingEndDate: bondingEffD2 = "",
        } = userData.bonding || {}

        const {
          basic = true, intermediate = false,
          advanced = false, advanced80 = false, commercial = false,
        } = userData.serviceOptions || {}

        const { radius } = userData.serviceArea || {}

        let addonReferral = ''
        let addonReferralPurchased = false

        if (userData.referral) {
          if (userData.referral.purchased) addonReferralPurchased = true
          if (userData.referral.monthly) addonReferral = 'monthly'
          if (userData.referral.yearly) addonReferral = 'yearly'
        }

        let addonPriority = ''
        let addonPriorityPurchased = false

        if (userData.priority) {
          if (userData.priority.purchased) addonPriorityPurchased = true
          if (userData.priority.monthly) addonPriority = 'monthly'
          if (userData.priority.yearly) addonPriority = 'yearly'
        }

        const user = Object.assign({},
          username && {username},
          companyName && {companyName},
          addressLine1 && {addressLine1},
          addressLine2 && {addressLine2},
          city && {city},
          zip && {zip},
          ein && {ein},
          strState && {strState},
          stateLicenseNumber && {stateLicenseNumber},
          businessInsName && {businessInsName},
          businessAgentPhone && {businessAgentPhone},
          businessPolicyNo && {businessPolicyNo},
          businessInsCompany && {businessInsCompany},
          businessState && {businessState},
          businessEffD1 && {businessEffD1},
          businessEffD2 && {businessEffD2},
          bondingInsName && {bondingInsName},
          bondingAgentPhone && {bondingAgentPhone},
          bondingPolicyNo && {bondingPolicyNo},
          bondingInsCompany && {bondingInsCompany},
          bondingAmount && {bondingAmount},
          bondingEffD1 && {bondingEffD1},
          bondingEffD2 && {bondingEffD2},
          {serviceOptions: { basic, intermediate, advanced, advanced80, commercial },},
          radius && {radius},
          addonReferral && {addonReferral},
          addonReferralPurchased && {addonReferralPurchased},
          addonPriority && {addonPriority},
          addonPriorityPurchased && {addonPriorityPurchased},
        )
        
        const userPreserve = { ...user, ...objUser, ['phoneNumber']: numbersOnly(objUser.phoneNumber)}
        
        console.log('1. RESET STORE USER AND PRESERVE')
        console.log(`STORE USER: ${JSON.stringify(userPreserve)}`)
        await store.resetStoreUser()
        await store.saveUserInfo(userPreserve)
        setObjUser(userPreserve)

        setLoading(false)

        navigate(`${rootOnboarding}/update-company-info`)

        return
      }
    }
    catch (error) {
      // do not report error, try to create account
      setLoading(false)
      console.log('IF YOU SEE THIS MESSAGE THAT MEANS ERRORS IN MY CODE', error)
    }

    console.log('NO USER FOUND. CREATING COMPANY ADMIN')

    console.log('2. RESET STORE USER AND CREATE NEW', objUser)
    console.log(`STORE USER: ${JSON.stringify(objUser)}`)
    await store.resetStoreUser()
    await store.saveUserInfo(objUser)

    console.log('creating...')
    const res = await adminCreateUser(objUser)
    if (DEBUG) console.log('DEBUG: CompanyAdminUserCreated=', res)
    console.log('creating complete.')

    if (!res) {
      setApiError('Fetching error...')
      setLoading(false)
    } else if (res['error']) {
      setLoading(false)
      //   {
      //     "error":
      //     "An error occurred (UsernameExistsException) when calling the AdminCreateUser operation: An account with the given email already exists."
      // }
      
      const errorData = res['error'].split(':')
      if (errorData.length === 2) {

        let errorDescription = errorData[1]

        if (incorrectUserException && errorDescription.indexOf('email already exists')) {
          errorDescription = 'Unable to login with provided credentials. Incorrect password.'
        }

        setApiError(errorDescription)

      } else if (errorData.length > 2) {
        setApiError(errorData[errorData.length - 2] + ':' + errorData[errorData.length - 1])
      } else {
        setApiError(res['error'])
      }

    }
    else {

      // login with hardcoded credentials, testing only
      // await signIn(process.env.REACT_APP_HARDCODED_USER, process.env.REACT_APP_HARDCODED_PASSWORD)

      await signIn(objUser.eMail, objUser.password)

      navigate(`${rootOnboarding}/update-company-info`)

    }
  }

  return (
    <Grid className={styles['fixed-width-container']}>

      <Toolbar label='Setup: account' value={store.setupProgress}
        navigateBack='/prequalification-success' />

      <div className={styles['form-subheading']}>{staticContent.accountOwnerInformation}</div>

      <div className={styles['form-container']}>

        <form style={{ width: '100%' }} onSubmit={handleSubmit}>

          {fields.map((f, index) => (
            <div key={`sum-${index}`}>
              <div key={`textdiv-${index}`} className={styles['textfield-flex-parent']}>
                <CssTextField
                  id={f.id}
                  label={f.label}
                  key={`textfield-${index}`}
                  required={f.isRequired}
                  // tooltip={f.tooltip}
                  error={f.error}
                  helperText={f.helperText}
                  type={!passwordVisible ? f.type : 'text'}
                  variant='filled'
                  value={f.value}
                  onChange={(f.id === 'phoneNumber') ?
                    (e) => onTextChange(e)
                    :
                    handleChange
                  }
                  // errorIndicator={(f.validate && f.validate(f.value)) ? officialColors.gray : officialColors.red}
                  sx={{ margin: '5px 0' }}
                  {...f.extraProps}
                />

                {f.hasIcon &&
                  (passwordVisible ?
                    <span key={`span-1-${index}`} className={[styles['mui-eye-icon-span'], styles['eye-icon-rev']].join(" ")} onClick={() => setPasswordVisible(false)}><VisibilityOffIcon /></span> :
                    <span key={`span-2-${index}`} className={styles['mui-eye-icon-span']} onClick={() => setPasswordVisible(true)}><VisibilityIcon /></span>
                  )
                }

              </div>

              {<div className={styles['common-field-err']}>{objError[f.id]}</div>}
            </div>
          ))}
          <div style={{ fontFamily: 'Lato' }}>{staticContent.passwordRule}</div>

          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'row', alignContent: 'flex-start', alignItems: 'center' }}>
            <div style={{}}>

              <CustomCheckbox id='agree'
                required={true}
                checked={agree}
                onChange={handleChangeCheckbox}
                label={staticContent.iAgreeTo}
                labelStyle={{ fontFamily: 'Arial', fontSize: 14 }}
                sx={{ ml: 2, mr: 0 }}
              />
            </div>
            <div className={styles['terms-of-service-link']} onClick={handleTermsOfService}>
              {staticContent.termsAndConditions}
            </div>
          </div>

          <WebModal
            open={modalShow}
            onClose={() => setModalShow(false)}
            html={html}
            data={modalShowData}
          />

          <div className={styles['btn-container-create-account']}>
            {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}
            <ProgressButton type='submit'
              loading={loading}
              color='primary'
              // tooltip={formValidationInfo}
              variant='contained'
              disabled={hasValidationIssues}
            >{staticContent.createAccount}</ProgressButton>
          </div>

        </form>

      </div>
    </Grid>
  )
})

export default CreateAccount