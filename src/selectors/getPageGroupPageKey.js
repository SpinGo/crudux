import getCruduxState from '../util/getCruduxState'

const getPageGroupPageKey = (getCrudState = getCruduxState) =>
  (pageGroup, state) => {
    const pageGroupState = getCrudState(state).pageGroup[pageGroup]
    return pageGroupState && pageGroupState.currentPage
  }

export default getPageGroupPageKey
