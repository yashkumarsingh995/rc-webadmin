import { Auth, CognitoUser } from '@aws-amplify/auth'
import { Hub, HubCapsule } from '@aws-amplify/core'
import { ClientMetaData } from '@aws-amplify/auth/lib-esm/types'
import { UserIdentity } from 'react-admin'
import awsExports from '../aws-exports'

const DEBUG = (process.env.REACT_APP_AUTH_MESSAGES === 'true') ? 1 : 0

export interface AuthProviderOptions {
  authGroups?: string[]
}

const defaultOptions = {
  authGroups: [],
}

export class AuthProvider {
  public authGroups: string[]

  public constructor(options?: AuthProviderOptions) {
    this.authGroups = options?.authGroups || defaultOptions.authGroups

    Hub.listen('auth', (capsule: HubCapsule) => {
      if (DEBUG) {
        console.log(`DEBUG: Capsule payload: ${capsule.payload}`)
      }
      switch (capsule.payload.event) {
        case 'signIn_failure':
          if (DEBUG) {
            console.log(`DEBUG AuthProviderEvent: ${capsule.payload.data}`)
          }
          if (capsule.payload.data?.code === 'PasswordResetRequiredException') {
            const cognitoHostedUI = awsExports.oauth?.domain
            const cognitoAppClientId = awsExports.aws_user_pools_web_client_id

            const errorMessage = encodeURIComponent(
              'You need to reset your password. Please log in with it here and follow the instructions.',
            )
            window.location.href = `https://${cognitoHostedUI}/login?client_id=${cognitoAppClientId}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/login&errorMessage=${errorMessage}`
          }
          break
      }
    })
  }

  public login = ({
    username,
    password,
    clientMetadata,
  }: Record<string, unknown>): Promise<CognitoUser | unknown> => {
    return Auth.signIn(username as string, password as string, clientMetadata as ClientMetaData)
  }

  public logout = (): Promise<any> => {
    return Auth.signOut()
  }

  public async getIdentity(): Promise<UserIdentity> {
    try {
      const user = await Auth.currentUserInfo()
      const { email, sub } = user?.attributes

      const identity: UserIdentity = {
        id: sub,
        fullName: email,
        avatar: undefined,
      }
      return identity
    } catch (e) {
      return null as any
    }
  }

  public checkAuth = async (): Promise<void> => {
    const session = await Auth.currentSession()
    if (this.authGroups.length === 0) {
      return
    }
    const userGroups = session.getAccessToken().decodePayload()['cognito:groups']

    if (!userGroups) {
      throw new Error('Unauthorized')
    }

    for (const group of userGroups) {
      if (this.authGroups.includes(group)) {
        return
      }
    }

    throw new Error('Unauthorized')
  }

  public checkError = (): Promise<void> => {
    return Promise.resolve()
  }

  public getPermissions = async (): Promise<string[]> => {
    const session = await Auth.currentSession()
    const groups = session.getAccessToken().decodePayload()['cognito:groups']
    return groups ? Promise.resolve(groups) : Promise.reject()
  }
}
