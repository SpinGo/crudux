import getCruduxState from '../util/getCruduxState'

const getPageMetadata = (getCrudState = getCruduxState) =>
  (pageKey, state) => {
    const { pageMeta } = getCrudState(state)
    return pageMeta[pageKey]
  }

export default getPageMetadata
