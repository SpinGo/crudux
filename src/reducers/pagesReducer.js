import { combineReducers } from 'redux'
import omitBy from 'lodash/omitBy'
import * as actionTypes from '../actionTypes'
import flag from './flagReducer'

const schema = (state = null, action) => {
  if (action.meta && action.meta.schema) {
    return action.meta.schema
  }
  return state
}

const entities = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_RESOURCE_PAGE_SUCCESS: {
      return action.payload.result
    }
    default:
      return state
  }
}

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
  schema,
  entities,
  hasBeenRequested,
  isFetching,
  params: paramsReducer,
  pagination: paginationReducer,
})

export default (state = {}, action) => {
  const { meta } = action
  switch (action.type) {
    case actionTypes.CREATE_RESOURCE_SUCCESS:
    case actionTypes.UPDATE_RESOURCE_SUCCESS:
    case actionTypes.DELETE_RESOURCE_SUCCESS: {
      return omitBy(state, page => page.schema === meta.schema)
    }
    default: {
      if (!(meta && meta.pageKey)) { return state }
      const { pageKey } = meta
      const newState = pageMetadataReducer(state[pageKey], action)
      return { ...state, [pageKey]: newState }
    }
  }
}
