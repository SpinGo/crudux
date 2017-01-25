import getCruduxState from '../util/getCruduxState'

const getEntityMetadata = (getCrudState = getCruduxState) =>
  (schema, id, state) => {
    const entitiesOfType = getCrudState(state).meta[schema.key]
    return entitiesOfType && entitiesOfType[id]
  }

export default getEntityMetadata
