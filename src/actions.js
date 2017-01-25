import { normalize } from 'normalizr'

import * as actionTypes from './actionTypes'
import { createPageKey } from './util'

export const fetchRequest = (schema, resourceId) => {
  const { key } = schema
  return {
    type: actionTypes.FETCH_RESOURCE_REQUEST,
    meta: { schema: key, resourceId },
  }
}

export const fetchSuccess = (schema, resourceId, record) => {
  const { key } = schema
  const normalized = normalize(record, schema)
  return {
    type: actionTypes.FETCH_RESOURCE_SUCCESS,
    payload: normalized,
    meta: { schema: key, resourceId },
  }
}

export const fetchFailure = (schema, resourceId, error) => {
  const { key } = schema
  return {
    type: actionTypes.FETCH_RESOURCE_FAILURE,
    payload: error,
    meta: { schema: key, resourceId },
  }
}

export const createRequest = (schema, resourceClientId, record) => {
  const { key } = schema
  return {
    type: actionTypes.CREATE_RESOURCE_REQUEST,
    payload: record,
    meta: { schema: key, resourceClientId },
  }
}

export const createSuccess = (schema, resourceClientId, record) => {
  const { key } = schema
  const normalized = normalize(record, schema)
  const resourceId = normalized.result
  return {
    type: actionTypes.CREATE_RESOURCE_SUCCESS,
    payload: normalized,
    meta: { schema: key, resourceClientId, resourceId },
  }
}

export const createFailure = (schema, resourceClientId, error) => {
  const { key } = schema
  return {
    type: actionTypes.CREATE_RESOURCE_FAILURE,
    payload: error,
    meta: { schema: key, resourceClientId },
  }
}

export const updateRequest = (schema, resourceId, record) => {
  const { key } = schema
  // TODO - do I want to normalize this to get the ID?
  // Maybe not, I could use selectors to support the change feature?
  // (This seems less likely to be the right way to do it)
  return {
    type: actionTypes.UPDATE_RESOURCE_REQUEST,
    payload: record,
    meta: { schema: key, resourceId },
  }
}

export const updateSuccess = (schema, resourceId, record) => {
  const { key } = schema
  const normalized = normalize(record, schema)
  return {
    type: actionTypes.UPDATE_RESOURCE_SUCCESS,
    payload: normalized,
    meta: { schema: key, resourceId },
  }
}

export const updateFailure = (schema, resourceId, error) => {
  const { key } = schema
  return {
    type: actionTypes.UPDATE_RESOURCE_FAILURE,
    payload: error,
    meta: { schema: key, resourceId },
  }
}

export const deleteRequest = (schema, resourceId) => {
  const { key } = schema
  return {
    type: actionTypes.DELETE_RESOURCE_REQUEST,
    meta: { schema: key, resourceId },
  }
}

export const deleteSuccess = (schema, resourceId) => {
  const { key } = schema
  return {
    type: actionTypes.DELETE_RESOURCE_SUCCESS,
    meta: { schema: key, resourceId },
  }
}

export const deleteFailure = (schema, resourceId, error) => {
  const { key } = schema
  return {
    type: actionTypes.DELETE_RESOURCE_FAILURE,
    payload: error,
    meta: { schema: key, resourceId },
  }
}

export const fetchPageRequest = (schema, pageGroup, pageParams, options = {}) => {
  const { key } = schema
  const pageKey = options.pageKey || createPageKey(schema, pageParams)
  const changePage = !!options.changePage
  return {
    type: actionTypes.FETCH_RESOURCE_PAGE_REQUEST,
    payload: pageParams,
    meta: { schema: key, pageGroup, pageKey, changePage },
  }
}

export const fetchPageSuccess = (schema, pageGroup, pageParamsOrKey, records) => {
  const { key } = schema
  const pageKey = createPageKey(schema, pageParamsOrKey)
  const normalized = normalize(records, [schema])
  return {
    type: actionTypes.FETCH_RESOURCE_PAGE_SUCCESS,
    payload: normalized,
    meta: { schema: key, pageGroup, pageKey },
  }
}

export const fetchPageFailure = (schema, pageGroup, pageParamsOrKey, error) => {
  const { key } = schema
  const pageKey = createPageKey(schema, pageParamsOrKey)
  return {
    type: actionTypes.FETCH_RESOURCE_PAGE_FAILURE,
    payload: error,
    meta: { schema: key, pageGroup, pageKey },
  }
}

export const changePageGroupPage = (schema, pageGroup, pageParams, options = {}) => {
  const { key } = schema
  const pageKey = createPageKey(schema, options.pageKey || pageParams)
  return {
    type: actionTypes.CHANGE_PAGE_GROUP_PAGE,
    payload: pageParams,
    meta: { schema: key, pageGroup, pageKey },
  }
}

export const resetPageGroup = (schema, pageGroup) => {
  const { key } = schema
  return {
    type: actionTypes.RESET_PAGE_GROUP,
    meta: { schema: key, pageGroup },
  }
}
