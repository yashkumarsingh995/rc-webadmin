import {
  AuthProvider as AuthProviderInterface,
} from 'ra-core'

import { AuthProvider, AuthProviderOptions } from './AuthProvider'

export function buildAuthProvider(options?: AuthProviderOptions): AuthProviderInterface {
  const authProvider = new AuthProvider(options)

  return {
    login: authProvider.login,
    logout: authProvider.logout,
    checkAuth: authProvider.checkAuth,
    checkError: authProvider.checkError,
    getPermissions: authProvider.getPermissions,
    getIdentity: authProvider.getIdentity,
  }
}

