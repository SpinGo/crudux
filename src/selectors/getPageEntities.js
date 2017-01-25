import { denormalize } from 'normalizr'
import getCruduxState from '../util/getCruduxState'
import getPage from './getPage'

const getEntity = (getCrudState = getCruduxState) =>
  (schema, pageKey, state) => {
    const { entities } = getCrudState(state)
    const page = getPage(getCrudState)(pageKey, state)
    return denormalize(page, [schema], entities)
  }

export default getEntity
