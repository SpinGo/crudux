import { denormalize } from 'normalizr'

export const getEntities = (mountpoint, state) => state[mountpoint].entities

const getMetaData = (mountpoint, state) => state[mountpoint].meta

const getPages = (mountpoint, state) => state[mountpoint].pages

const getPageMeta = (mountpoint, state) => state[mountpoint].pageMeta

const getPageGroups = (mountpoint, state) => state[mountpoint].pageGroup

export const getEntityMetaData = (mountpoint, state, schema, id) => {
  const allMetaData = getMetaData(mountpoint, state)
  const { key } = schema
  const metaData = allMetaData[key] || {}
  console.log(denormalize(id, schema, allMetaData)) // eslint-disable-line
  return metaData[id]
}

export const getEntity = (mountpoint, state, schema, id) => {
  // const { key } = schema
  const entities = getEntities(mountpoint, state)
  // const metaData = getEntityMetaData(mountpoint, state, schema, id)
  // if (metaData) {
  //   if (options.optimistic) {
  //     if (metaData.isCreating) {
  //       return entities._creating[id]
  //     }
  //     if (metaData.isUpdating) {
  //       return entities._updating[id]
  //     }
  //   }
  // }
  return denormalize(id, schema, entities)
}

export const getEntityIsReady = (mountpoint, state, schema, id) => {
  const metaData = getEntityMetaData(mountpoint, state, schema, id)
  if (metaData) {
    const { isFetching, isCreating, isUpdating, isDeleting } = metaData
    return !(isFetching || isCreating || isUpdating || isDeleting)
  }
  return false
}

export const getPage = (mountPoint, state, pageKey) => {
  const pages = getPages(mountPoint, state) || {}
  return pages[pageKey]
}

export const getPageMetaData = (mountPoint, state, pageKey) => {
  const pageMeta = getPageMeta(mountPoint, state)
  return pageMeta[pageKey]
}

export const getPageIsFetching = (mountPoint, state, pageKey) => {
  const metaData = getPageMetaData(mountPoint, state, pageKey)
  return metaData && metaData.isFetching
}

export const getPageHasBeenRequested = (mountPoint, state, pageKey) => {
  const metaData = getPageMetaData(mountPoint, state, pageKey)
  return !!(metaData && metaData.hasBeenRequested)
}

export const getPageIsReady = (mountPoint, state, pageKey) => {
  const metaData = getPageMetaData(mountPoint, state, pageKey)
  if (metaData) {
    const { isFetching, hasBeenRequested } = metaData
    return hasBeenRequested && !isFetching
  }
  return false
}

export const getPageGroupCurrentPageKey = (mountPoint, state, pageGroup) => {
  const pageGroups = getPageGroups(mountPoint, state)
  const pageGroupState = pageGroups[pageGroup] || {}
  return pageGroupState.currentPage
}

export const getPageGroupCurrentPage = (mountPoint, state, pageGroup) => {
  const pageKey = getPageGroupCurrentPageKey(mountPoint, state, pageGroup)
  return getPage(mountPoint, state, pageKey)
}

export const getPageEntities = (mountPoint, state, schema, pageKey) => {
  const entities = getEntities(mountPoint, state)
  const page = getPage(mountPoint, state, pageKey)
  return denormalize(page, [schema], entities)
}

export const getPageGroupEntities = (mountPoint, state, schema, pageGroup) => {
  const entities = getEntities(mountPoint, state)
  const page = getPageGroupCurrentPage(mountPoint, state, pageGroup)
  return denormalize(page, [schema], entities)
}

export const getPageGroupIsReady = (mountPoint, state, pageGroup) => {
  const page = getPageGroupCurrentPageKey(mountPoint, state, pageGroup)
  return getPageIsReady(mountPoint, state, page)
}

export const getPageGroupPageMetaData = (mountPoint, state, pageGroup) => {
  const page = getPageGroupCurrentPageKey(mountPoint, state, pageGroup)
  return getPageMetaData(mountPoint, state, page)
}
