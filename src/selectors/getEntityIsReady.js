import getCruduxState from '../util/getCruduxState'
import getEntityMetadata from './getEntityMetadata'

const getEntityIsReady = (getCrudState = getCruduxState) =>
  (schema, id, state) => {
    // Initally check the metadata for that entity to see if its
    // currently being acted on.
    const metadata = getEntityMetadata(getCrudState)(schema, id, state)
    if (metadata) {
      const { isFetching, isCreating, isUpdating, isDeleting } = metadata
      return !(isFetching || isCreating || isUpdating || isDeleting)
    }
    // If the metadata doesn't exist yet, the entity could be 'ready' because
    // it was inserted as part of a page.  In that case we assume it is ready.
    const { entities } = getCrudState(state)
    const entitiesOfType = entities[schema.key]
    return !!(entitiesOfType && entitiesOfType[id])
  }

export default getEntityIsReady
