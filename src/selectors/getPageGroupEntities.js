import getCruduxState from '../util/getCruduxState'
import getPageGroupPageKey from './getPageGroupPageKey'
import getPageEntities from './getPageEntities'

const getPageGroupEntities = (getCrudState = getCruduxState) =>
  (schema, pageGroup, state) => {
    const pageKey = getPageGroupPageKey(getCrudState)(pageGroup, state)
    return getPageEntities(getCrudState)(schema, pageKey, state)
  }

export default getPageGroupEntities
