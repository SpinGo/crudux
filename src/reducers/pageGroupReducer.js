import * as actionTypes from '../actionTypes'

export default (state = {}, action) => {
  const { meta } = action
  if (!(meta && meta.pageGroup)) { return state }
  const { pageGroup, pageKey } = meta
  // NOTE - We're completely replacing the group state, since the only value is `currentPage`
  // right now
  switch (action.type) {
    case actionTypes.FETCH_RESOURCE_PAGE_REQUEST:
      return meta.changePage ? { ...state, [pageGroup]: { currentPage: pageKey } } : state
    case actionTypes.CHANGE_PAGE_GROUP_PAGE:
      return { ...state, [pageGroup]: { currentPage: pageKey } }
    case actionTypes.RESET_PAGE_GROUP:
      return { ...state, [pageGroup]: { currentPage: null } }
    default:
      return state
  }
}
