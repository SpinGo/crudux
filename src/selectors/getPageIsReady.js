import getCruduxState from '../util/getCruduxState'
import getPageMetadata from './getPageMetadata'

const getPageIsReady = (getCrudState = getCruduxState) =>
  (pageKey, state) => {
    const metadata = getPageMetadata(getCrudState)(pageKey, state)
    if (metadata) {
      const { isFetching, hasBeenRequested } = metadata
      return hasBeenRequested && !isFetching
    }
    return false
  }

export default getPageIsReady
