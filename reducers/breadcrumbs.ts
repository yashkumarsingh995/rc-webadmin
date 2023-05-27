const defaultState = {
  main: {
    name: null,
    link: null,
  },
  sub: [],
}

export interface Breadcrumb {
  name: string
  link: string | null
}

export const SET_MAIN_CRUMB = 'SET_MAIN_CRUMB'
export const SET_SUB_CRUMBS = 'SET_SUB_CRUMBS'

export default (previousState = defaultState, { type, payload }) => {
  if (type === SET_MAIN_CRUMB) {
    return Object.assign({}, previousState, { main: payload.breadcrumb, sub: [] })
  } else if (type === SET_SUB_CRUMBS) {
    return Object.assign({}, previousState, { sub: payload.breadcrumbs })
  }
  return previousState
}
