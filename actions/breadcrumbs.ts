import { Breadcrumb, SET_MAIN_CRUMB, SET_SUB_CRUMBS } from '../reducers/breadcrumbs'

export const setMainCrumb = (breadcrumb: Breadcrumb) => {
  return {
    type: SET_MAIN_CRUMB,
    payload: {
      breadcrumb,
    },
  }
}

export const setSubCrumbs = (breadcrumbs: Breadcrumb[]) => {
  return {
    type: SET_SUB_CRUMBS,
    payload: {
      breadcrumbs,
    },
  }
}
