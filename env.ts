export interface EnvType {
  cogntioUserPoolId?: string
  userDataBucket?: string
  congitoClientId?: string
  rcAdminGroup?: string
  ownerAdminGroup?: string
  managerGroup?: string
  marketingGroup?: string
  contentEditorGroup?: string
  supportManagerGroup?: string
  supportRepGroup?: string
  rcApiUrl?: string
  environment?: string
}

export const env: EnvType = {
  cogntioUserPoolId: process.env.REACT_APP_ADMIN_USER_POOL,
  userDataBucket: process.env.REACT_APP_USER_DATA_BUCKET,
  congitoClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
  rcAdminGroup: process.env.REACT_APP_ADMIN_GROUP_RC_ADMIN,
  ownerAdminGroup: process.env.REACT_APP_ADMIN_GROUP_OWNER_ADMIN,
  managerGroup: process.env.REACT_APP_ADMIN_GROUP_MANAGER,
  marketingGroup: process.env.REACT_APP_ADMIN_GROUP_MARKETING,
  contentEditorGroup: process.env.REACT_APP_ADMIN_GROUP_CONTENT_EDITIOR,
  supportManagerGroup: process.env.REACT_APP_ADMIN_GROUP_SUPPORT_MANAGER,
  supportRepGroup: process.env.REACT_APP_ADMIN_GROUP_SUPPORT_REP,
  rcApiUrl: process.env.REACT_APP_API_URL,
  environment: process.env.REACT_APP_ENVIRONMENT,
}
