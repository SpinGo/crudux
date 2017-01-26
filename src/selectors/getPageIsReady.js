import getCruduxState from '../util/getCruduxState'
import getPageMetadata from './getPageMetadata'

const getPageIsReady = (getCrudState = getCruduxState) =>
  (pageKey, state) => {
    const metaData = getPageMetadata(getCrudState)(pageKey, state)
    if (metaData) {
      const { isFetching, hasBeenRequested } = metaData
      return hasBeenRequested && !isFetching
    }
    return false
  }

export default getPageIsReady
