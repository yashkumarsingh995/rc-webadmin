import { env } from './env'

export const isAdmin = permissions => (permissions.indexOf(env.rcAdminGroup) >= 0)
export const isCompanyAdmin = permissions => (permissions.indexOf(env.ownerAdminGroup) >= 0)
export const isSupport = permissions => (permissions.indexOf(env.supportManagerGroup) >= 0 || permissions.indexOf(env.supportRepGroup) >= 0)