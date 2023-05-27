import { Auth } from '@aws-amplify/auth'
import { env } from './env'

export const getIdToken = async () => ({
  Authorization: (await Auth.currentSession()).getIdToken().getJwtToken(),
})

export const getAccessToken = async () => ({
  'X-Amz-Access-Token': (await Auth.currentSession()).getAccessToken().getJwtToken(),
})

const settings = {
  aws_project_region: 'us-east-2',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: env.cogntioUserPoolId,
  aws_user_pools_web_client_id: env.congitoClientId,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
}

export default settings
