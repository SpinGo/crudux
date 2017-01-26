import getCruduxState from '../util/getCruduxState'
import getPageGroupPageKey from './getPageGroupPageKey'
import getPageIsReady from './getPageIsReady'

const getPageGroupPage = (getCrudState = getCruduxState) =>
  (pageGroup, state) => {
    const pageKey = getPageGroupPageKey(getCrudState)(pageGroup, state)
    return getPageIsReady(getCrudState)(pageKey, state)
  }

export default getPageGroupPage
