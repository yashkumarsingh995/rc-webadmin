import React from 'react'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import { useLogin, useNotify, useSafeSetState, useTranslate } from 'ra-core'
import { Field, Form } from 'react-final-form'
import awsExports from '../aws-exports'
import { NotificationType } from 'ra-core'


const Input = ({ meta: { touched, error }, input: inputProps, ...props }) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
)

export const LoginForm = props => {
  const { redirectTo } = props
  const [loading, setLoading] = useSafeSetState(false)
  const login = useLogin()
  const translate = useTranslate()
  const notify = useNotify()
  
  const initialUsername = ''
  const initialPassword = ''

  const validate = values => {
    const errors = { username: undefined, password: undefined }

    if (!values.username) {
      errors.username = translate('ra.validation.required')
    }
    if (!values.password) {
      errors.password = translate('ra.validation.required')
    }
    return errors
  }

  const submit = values => {
    setLoading(true)
    login(values, redirectTo)
      .then(r => {
        setLoading(false)
        console.log(r)
        // TODO: need to be more clever about this. Catching a few setup issues when creating accounts directly in Cognito related to verification and if force password is on
        if (r.challengeName) {
          throw new Error(`Login issue from cognito: ${r.challengeName}`)
        }
        if (!r.attributes.email_verified) {
          throw new Error('Email needs to be verified')
        }
      })
      .catch(error => {
        setLoading(false)
        const message =
          typeof error === 'string'
            ? error
            : typeof error === 'undefined' || !error.message
              ? 'ra.auth.sign_in_error'
              : error.message
        notify(message, { type: 'warning' as NotificationType })
      })
  }

  const cognitoHostedUI = awsExports.oauth?.domain
  const cognitoAppClientId = awsExports.aws_user_pools_web_client_id

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      initialValues={{
        username: initialUsername,
        password: initialPassword,
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          {/* <div className={classes.form}> */}
          <div>
            <h2 className="text-center uppercase font-bold text-darkBlue mt-8 mb-0">
              Sign into your account
            </h2>
            {/* <div className={classes.input}/> */}
            <div>
              <Field
                id="username"
                name="username"
                component={Input}
                label={translate('ra.auth.username')}
                disabled={loading}
              />
            </div>
            {/* <div className={classes.input}> */}
            <div>
              <Field
                id="password"
                name="password"
                component={Input}
                label={translate('ra.auth.password')}
                type="password"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
            {/* <div className={classes.forgotPasswordLink}> */}
            <div>
              Forgot your password?{' '}
              <a
                href={`https://${cognitoHostedUI}/forgotPassword?client_id=${cognitoAppClientId}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/login`}
                className="underline"
              >
                Reset Password
              </a>
            </div>
          </div>
          <CardActions>
            {/* <Button variant="contained" type="submit" disabled={loading} className={classes.button}> */}
            <Button variant="contained" type="submit" disabled={loading}>
              {/* {loading && <CircularProgress className={classes.icon} size={18} thickness={2} />} */}
              {loading && <CircularProgress size={18} thickness={2} />}
              {translate('ra.auth.sign_in')}
            </Button>
          </CardActions>
          <div className="flex flex-col items-center mb-4">
            <a href="/" className="underline">
              Sign up for a new Account
            </a>
            <a href="/" className="underline">
              I have a User ID
            </a>
          </div>
        </form>
      )}
    />
  )
}

LoginForm.propTypes = {
  redirectTo: PropTypes.string,
}
