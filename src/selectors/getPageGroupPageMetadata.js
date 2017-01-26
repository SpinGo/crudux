import getCruduxState from '../util/getCruduxState'
import getPageGroupPageKey from './getPageGroupPageKey'
import getPageMetadata from './getPageMetadata'

const getPageGroupPage = (getCrudState = getCruduxState) =>
  (pageGroup, state) => {
    const pageKey = getPageGroupPageKey(getCrudState)(pageGroup, state)
    return getPageMetadata(getCrudState)(pageKey, state)
  }

export default getPageGroupPage
