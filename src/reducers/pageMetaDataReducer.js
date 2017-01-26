import { combineReducers } from 'redux'
import * as actionTypes from '../actionTypes'
import flag from './flagReducer'

const isFetching = flag({
  trueWhen: [actionTypes.FETCH_RESOURCE_PAGE_REQUEST],
  falseWhen: [actionTypes.FETCH_RESOURCE_PAGE_SUCCESS, actionTypes.FETCH_RESOURCE_PAGE_FAILURE],
})

const hasBeenRequested = flag({
  trueWhen: [actionTypes.FETCH_RESOURCE_PAGE_REQUEST],
})

const paramsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RESOURCE_PAGE_REQUEST:
      return action.payload
    default:
      return state
  }
}

const paginationReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RESOURCE_PAGE_SUCCESS:
      return action.meta.pagination || state
    default:
      return state
  }
}

const pageMetadataReducer = combineReducers({
  hasBeenRequested,
  isFetching,
  params: paramsReducer,
  pagination: paginationReducer,
})

export default (state = {}, action) => {
  const { meta } = action
  if (!(meta && meta.pageKey)) { return state }
  const { pageKey } = meta
  const newState = pageMetadataReducer(state[pageKey], action)
  return { ...state, [pageKey]: newState }
}
