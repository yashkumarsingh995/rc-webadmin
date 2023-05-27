import { Auth } from 'aws-amplify'
import { Amplify } from '@aws-amplify/core'

const awsConfig = {
  aws_project_region: process.env.REACT_APP_PROJECT_REGION,
  aws_cognito_region: process.env.REACT_APP_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  aws_appsync_authenticationType: process.env.REACT_APP_AUTH_TYPE,
}

Amplify.configure(awsConfig);

export const getAccessToken = async () => ((await Auth.currentSession()).getAccessToken().getJwtToken());
export const getIdToken = async () => ((await Auth.currentSession()).getIdToken().getJwtToken());
export const getHeaders = async () => {
  const headers = {
    'Content-Type': 'application/json',
  }
  const session = await Auth.currentSession()
  headers['Authorization'] = `${session.getIdToken().getJwtToken()}`
  headers['X-Amz-Access-Token'] = `${session.getAccessToken().getJwtToken()}`
  return headers
}

export async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password)
    return user
  } catch (error) {
    console.log('Error signing in', error);
    return { error }
  }
}

export async function signOut() {
  try {
    const user = await Auth.signOut()
    return user
  } catch (error) {
    console.log('Error signing out', error);
    return { error }
  }
}

export async function forgotPassword(username) {
  // Send confirmation code to user's email (this sends the email, and consolelogs what is sent)
  try {
      const result = await Auth.forgotPassword(username)
      // TODO: remove extra log when done testing
      console.log(`1. forgotPassword result=${JSON.stringify(result)}`)
      return result
  }
  catch (e) {
      console.log(`2. forgotPassword error: ${JSON.stringify(e)}`)
  }
}

export async function forgotPasswordSubmit(email, code, new_password) {
  // Collect confirmation code and new password, then (this lets you reset the password)
  try {
      const result = Auth.forgotPasswordSubmit(email, code, new_password)
      // TODO: remove extra log when done testing
      console.log(`3. forgotPasswordSubmit result=${JSON.stringify(result)}`)
      return result
  }
  catch (e) {
      console.log(`4. forgotPasswordSubmit error: ${JSON.stringify(e)}`)
  }
}