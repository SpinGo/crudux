import {
  initialStateFromSchemas,
  mergeNewEntities,
  popUnder,
  putUnder,
} from '../util'

import * as actionTypes from '../actionTypes'

const reduceEntityType = (state = {}, action) => {
  // Notes:
  // The real magic happens w/ selectors and metadata.
  // That why nothing happens to entities, for example, on delete request until its successful
  // This allows for optional selections which give optimistic results
  const { payload, meta } = action
  const { resourceClientId, resourceId } = meta
  switch (action.type) {
    case actionTypes.CREATE_RESOURCE_REQUEST: {
      // Create a temporary item under a _creating key
      return putUnder(state, '_creating', resourceClientId, payload)
    }
    case actionTypes.CREATE_RESOURCE_SUCCESS:
    case actionTypes.CREATE_RESOURCE_FAILURE: {
      // Remove the temporary item
      return popUnder(state, resourceClientId, '_creating', false)
    }

    case actionTypes.UPDATE_RESOURCE_REQUEST:
      // Place payload resource into _updating
      return putUnder(state, '_updating', resourceId, payload)
    case actionTypes.UPDATE_RESOURCE_SUCCESS: // Replacment by mergeNewEntities
    case actionTypes.UPDATE_RESOURCE_FAILURE:
      // Remove entity from _updating (no replacing)
      return popUnder(state, resourceId, '_updating', false)

    case actionTypes.DELETE_RESOURCE_SUCCESS: {
      // Delete the item from entities
      const newState = { ...state }
      delete newState[resourceId]
      return newState
    }
    default:
      return state
  }
}

export default (schemas) => {
  const initalState = initialStateFromSchemas(schemas)
  return (state = initalState, action) => {
    if (!(action.meta && action.meta.schema)) { return state }
    const { meta: { schema } } = action
    const newState = mergeNewEntities(state, action)
    return {
      ...newState,
      [schema]: reduceEntityType(newState[schema], action),
    }
  }
}
