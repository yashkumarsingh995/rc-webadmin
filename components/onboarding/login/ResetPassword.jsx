import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Grid, MenuItem } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import splashLogo from '../../../assets/images/logo-installers@3x.png'
import { rootOnboarding, rootAdmin } from '../../../static/Roots'
import { useStore } from '../../../stores/OnBoardStore'
import ProgressButton from '../../base/ProgressButton'
import { CssTextField } from '../../base/CssTextField'
import { Toolbar } from '../../base/Toolbar'
import styles from '../Main.module.css'
import { forgotPasswordSubmit } from '../../../services/Aws'
import { emailIsValid, isNotEmpty, passwordIsValid } from '../../helpers/Main'
import staticContent from '../../../static/Onboarding'
import { formIsValid } from '../../helpers/Validation'
import { convertPhoneNumberToString, convertToValidPhoneNumber } from '../../helpers/Formatter'
import { DEBUG } from '../../helpers/Debug'


const ResetPassword = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { eMail = '' } = store.currentUser
  const userInit = { eMail, code: '', password: '' }

  const errorInit = { eMail: '', code: '', password: '' }

  const [objUser, setObjUser] = useState(userInit)
  const [objError, setObjError] = useState(errorInit)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [hasValidationIssues, setHasValidationIssues] = useState(false)
  const [formValidationInfo, setFormValidationInfo] = useState('')

  const { eMail: l1, code: l2, password: l3 } = staticContent.formLabels
  const { eMail: t1, code: t2, password: t3 } = staticContent.formTooltips

  const fields = [
    { id: 'eMail', value: objUser.eMail, validate: emailIsValid, label: l1, type: 'email', tooltip: t1, helperText: '', isRequired: true, extraProps: { disabled: true } },
    { id: 'code', value: objUser.code, validate: isNotEmpty, label: l2, type: 'text', tooltip: t2, helperText: '', isRequired: true, extraProps: { autoComplete: "off" } },
    { id: 'password', value: objUser.password, validate: passwordIsValid, label: l3, type: 'password', tooltip: t3, helperText: '', isRequired: true, hasIcon: true, extraProps: { autoComplete: "off" } },
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

    setFormValidationInfo(text)
    setHasValidationIssues(!isValid)

    store.saveUserInfo(newData)
    setObjUser(newData)
    setObjError(newError)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget
    if (!form.checkValidity()) {
      return
    }

    setLoading(true)

    try {
      console.log('forgotPasswordSubmit')
      const res = await forgotPasswordSubmit(objUser.eMail, objUser.code.trim(), objUser.password)
      console.log(`aws res==${res}`)

      if (!res) {
        setLoading(false)
        console.log(`aws error 3`)
        setApiError('Aws Unknown Error...')
        return
      }
      if (res['error']) {
        setLoading(false)
        console.log(`aws error 4`)
        setApiError(res['error'].message ? res['error'].message : 'Unknown Error...')
        return
      }
      setLoading(false)
      console.log(`success`)
      // TODO: test redirect to login page
      navigate(`${rootOnboarding}/login`)

    }
    catch (error) {
      setLoading(false)
      console.log('reset password: catched error=', error)
      setApiError(error.message ? error.message : 'Unknown Error catched...')
    }

    // TODO: test
    // setLoading(false)
    // navigate(`${rootOnboarding}/login`)

  }

  const handleLogin = () => {
    navigate(`${rootOnboarding}/login`)
  }

  const handleForgot = () => {
    navigate(`${rootOnboarding}/forgot-password`)
  }

  return (
    <div className={styles['container']}>
      <div className={styles['div-logo']}>
        <img src={splashLogo} alt="logo-installers" className={styles['img-card-logo']}></img>
      </div>

      <div className={[styles['div-card'], styles['div-card-login']].join(" ")}>
        <div className={styles['card-up']}>

          <Grid className={styles['fixed-width-container-400']}>

            <div className={styles['form-container']}>

              <div className={styles['form-heading-forgot']}>{staticContent.resetPassword}</div>
              <div className={styles['form-subheading-forgot']}>{staticContent.resetCodeHasBeen}</div>

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
                        onChange={handleChange}
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
                {/* {objError['password'] && <div style={{ fontFamily: 'Lato' }}>{staticContent.passwordRule}</div>} */}

                <div className={styles['btn-container-login']}>

                  {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}
                  <ProgressButton type='submit'
                    loading={loading}
                    color='primary'
                    // tooltip={formValidationInfo}
                    variant='contained'
                    disabled={hasValidationIssues}
                    sx={{ mb: 2 }}
                  >{staticContent.saveNewPassword}</ProgressButton>

                  <div style={{ display: 'flex', alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>
                    <button onClick={handleLogin} className={styles['btn-link-login']}>{staticContent.iAlreadyHaveAnAccount}</button><br />
                  </div>
                  <div style={{ display: 'flex', alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>
                    <button onClick={handleForgot} className={styles['btn-link-login']}>{staticContent.forgotYourPassword}</button>
                  </div>

                </div>

              </form>

            </div>
          </Grid>
        </div>

      </div>

    </div >

  )
})

export default ResetPassword