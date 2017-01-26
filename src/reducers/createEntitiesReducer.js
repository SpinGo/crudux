import reduce from 'lodash/reduce'
import { initialStateFromSchemas, popUnder, putUnder } from '../util'

import * as actionTypes from '../actionTypes'

const unionEntities = (allEntities, entities, resourceName) =>
  ({ ...allEntities, [resourceName]: { ...allEntities[resourceName], ...entities } })

const mergeNewEntities = (state, action) => {
  if (action.payload && action.payload.entities) {
    return reduce(action.payload.entities, unionEntities, state)
  }
  return state
}

export default (schemas) => {
  const initalState = initialStateFromSchemas(schemas)
  return (state = initalState, action) => {
    const { payload, meta } = action
    if (!(meta && meta.schema)) { return state }

    const newState = mergeNewEntities(state, action)

    const { resourceClientId, resourceId } = meta

    // Notes:
    // The real magic happens w/ selectors and metadata.
    // That why nothing happens to entities, for example, on delete request until its successful
    // This allows for optional selections which give optimistic results
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
      case actionTypes.UPDATE_RESOURCE_SUCCESS:
        // Replace entity w/ item from _updating
        return popUnder(state, resourceId, '_updating')
      case actionTypes.UPDATE_RESOURCE_FAILURE:
        // Just remove entity from _updating (no replacing)
        return popUnder(state, resourceId, '_updating', false)

      case actionTypes.DELETE_RESOURCE_SUCCESS: {
        // Delete the item from entities
        delete newState[resourceId]
        return newState
      }
      default:
        return newState
    }
  }
}
