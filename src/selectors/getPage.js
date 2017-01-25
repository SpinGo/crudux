import getCruduxState from '../util/getCruduxState'

const getPage = (getCrudState = getCruduxState) =>
  (pageKey, state) => {
    const { page } = getCrudState(state)
    return page[pageKey]
  }

export default getPage
