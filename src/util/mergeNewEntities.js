import reduce from 'lodash/reduce'

const unionEntities = (allEntities, entities, resourceName) =>
  ({ ...allEntities, [resourceName]: { ...allEntities[resourceName], ...entities } })

export default (state, action) => {
  if (action.payload && action.payload.entities) {
    return reduce(action.payload.entities, unionEntities, state)
  }
  return state
}
