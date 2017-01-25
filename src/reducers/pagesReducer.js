import * as actionTypes from '../actionTypes'

export default (state = {}, action) => {
  const { payload, meta } = action
  if (!(meta && meta.pageKey)) { return state }
  switch (action.type) {
    case actionTypes.FETCH_RESOURCE_PAGE_SUCCESS: {
      const { result } = payload
      const { pageKey } = meta
      return { ...state, [pageKey]: result }
    }
    default:
      return state
  }
}
