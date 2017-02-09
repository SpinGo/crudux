import getCruduxState from '../util/getCruduxState'

const getAllEntities = (getCrudState = getCruduxState) =>
  (schema, state) => {
    const { entities } = getCrudState(state)
    const { key } = schema
    return Object.values(entities[key])
  }

export default getAllEntities
