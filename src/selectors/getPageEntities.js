import { denormalize } from 'normalizr'
import getCruduxState from '../util/getCruduxState'
import getPage from './getPage'

const getPageEntities = (getCrudState = getCruduxState) =>
  (schema, pageKey, state) => {
    const { entities } = getCrudState(state)
    const page = getPage(getCrudState)(pageKey, state)
    const ids = (page && page.entities) || []
    return denormalize(ids, [schema], entities)
  }

export default getPageEntities
