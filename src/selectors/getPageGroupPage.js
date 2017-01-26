import getCruduxState from '../util/getCruduxState'
import getPageGroupPageKey from './getPageGroupPageKey'
import getPage from './getPage'

const getPageGroupPage = (getCrudState = getCruduxState) =>
  (pageGroup, state) => {
    const pageKey = getPageGroupPageKey(getCrudState)(pageGroup, state)
    return getPage(getCrudState)(pageKey, state)
  }

export default getPageGroupPage
