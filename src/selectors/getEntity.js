import { denormalize } from 'normalizr'
import getCruduxState from '../util/getCruduxState'

const getEntity = (getCrudState = getCruduxState) =>
  (schema, id, state) => {
    // TODO - Add optimistic choice for creating/updating states
    const { entities } = getCrudState(state)
    return denormalize(id, schema, entities)
  }

export default getEntity
