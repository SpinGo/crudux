import { combineReducers } from 'redux'
import * as actionTypes from '../actionTypes'
import { initialStateFromSchemas } from '../util'
import flag from './flagReducer'

const metadataFlagsReducer = combineReducers({
  isFetching: flag({
    trueWhen: [actionTypes.FETCH_RESOURCE_REQUEST],
    falseWhen: [actionTypes.FETCH_RESOURCE_SUCCESS, actionTypes.FETCH_RESOURCE_FAILURE],
  }),
  isCreating: flag({
    trueWhen: [actionTypes.CREATE_RESOURCE_REQUEST],
    falseWhen: [actionTypes.CREATE_RESOURCE_SUCCESS, actionTypes.CREATE_RESOURCE_FAILURE],
  }),
  isUpdating: flag({
    trueWhen: [actionTypes.UPDATE_RESOURCE_REQUEST],
    falseWhen: [actionTypes.UPDATE_RESOURCE_SUCCESS, actionTypes.UPDATE_RESOURCE_FAILURE],
  }),
  isDeleting: flag({
    trueWhen: [actionTypes.DELETE_RESOURCE_REQUEST],
    falseWhen: [actionTypes.DELETE_RESOURCE_SUCCESS, actionTypes.DELETE_RESOURCE_FAILURE],
  }),
})

export default (schemas) => {
  const initalState = initialStateFromSchemas(schemas)
  return (state = initalState, action) => {
    const { meta } = action
    if (!(meta && meta.schema)) { return state }

    const { schema, resourceId, resourceClientId } = meta
    const entityId = resourceId || resourceClientId
    if (!entityId) { return state }

    const entitiesState = state[schema] || {}
    const entityState = entitiesState[entityId] || {}

    const newState = metadataFlagsReducer(entityState, action)

    if (resourceClientId) {
      console.log('TODO - cleanup resourceClientId') // eslint-disable-line
    }

    return {
      ...state,
      [schema]: {
        ...entitiesState,
        [entityId]: newState,
      },
    }
  }
}
