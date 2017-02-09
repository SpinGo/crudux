import getCruduxState from '../util/getCruduxState'
import getPage from './getPage'

const getPageIsReady = (getCrudState = getCruduxState) =>
  (pageKey, state) => {
    const page = getPage(getCrudState)(pageKey, state)
    if (page) {
      const { isFetching, hasBeenRequested } = page
      return hasBeenRequested && !isFetching
    }
    return false
  }

export default getPageIsReady
