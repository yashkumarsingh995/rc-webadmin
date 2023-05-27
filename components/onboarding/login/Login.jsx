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
import { signIn } from '../../../services/Aws'
import { emailIsValid, passwordIsValid } from '../../helpers/Main'
import staticContent from '../../../static/Onboarding'
import { formIsValid } from '../../helpers/Validation'
import { convertPhoneNumberToString, convertToValidPhoneNumber } from '../../helpers/Formatter'
import { DEBUG } from '../../helpers/Debug'


const Login = observer(() => {

  const store = useStore()
  const navigate = useNavigate()

  const { eMail = '' } = store.currentUser
  const userInit = { eMail, password: '' }

  const errorInit = { eMail: '', password: '' }

  const [objUser, setObjUser] = useState(userInit)
  const [objError, setObjError] = useState(errorInit)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [hasValidationIssues, setHasValidationIssues] = useState(false)
  const [formValidationInfo, setFormValidationInfo] = useState('')

  const { eMail: l3, password: l5 } = staticContent.formLabels
  const { eMail: t3, password: t5 } = staticContent.formTooltips

  const fields = [
    { id: 'eMail', value: objUser.eMail, validate: emailIsValid, label: l3, type: 'email', tooltip: t3, helperText: '', isRequired: true },
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

    const res = await signIn(objUser.eMail, objUser.password)
    console.log(res)
    if (!res) {
      setApiError('Aws Unknown Error...')
      setLoading(false)
      return
    }
    if (res['error']) {
      setLoading(false)
      console.log(res['error'])
      setApiError(res['error'].message? res['error'].message: 'Unknown error...')
      return
    }

    // success
    setLoading(false)
    navigate(`${rootAdmin}/`)

  }

  const handleOnboard = () => {
    navigate(`${rootOnboarding}/`)
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

            <div className={styles['form-heading-login']}>{staticContent.signInToYourAccount}</div>

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
                        onChange={handleChange}
                        sx={{ margin: '5px 0' }}
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
                {objError['password'] && <div style={{ fontFamily: 'Lato' }}>{staticContent.passwordRule}</div>}

                <div className={styles['btn-container-login']}>
                  {apiError && <div className={styles['common-api-err']}>{staticContent.error}: {apiError}</div>}
                  <ProgressButton type='submit'
                    loading={loading}
                    color='primary'
                    // tooltip={formValidationInfo}
                    variant='contained'
                    disabled={hasValidationIssues}
                    sx={{ mb: 2 }}
                  >{staticContent.signIn}</ProgressButton>

                  <div style={{ display: 'flex', alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>
                    <button onClick={handleOnboard} className={styles['btn-link-login']}>{staticContent.iDoNotHaveAnAccount}</button><br />
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

export default Login