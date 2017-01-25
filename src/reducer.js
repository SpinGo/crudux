import { combineReducers } from 'redux'

import entitiesReducer from './reducers/entitiesReducer'
import entitiesMetaDataReducer from './reducers/entitiesMetaDataReducer'
import pagesReducer from './reducers/pagesReducer'
import pageMetaDataReducer from './reducers/pageMetaDataReducer'
import pageGroupReducer from './reducers/pageGroupReducer'

export default (schemas) => {
  const reducer = combineReducers({
    entities: entitiesReducer(schemas),
    meta: entitiesMetaDataReducer(schemas),
    pages: pagesReducer(schemas),
    pageMeta: pageMetaDataReducer(schemas),
    pageGroup: pageGroupReducer(schemas),
  })

  return reducer
}
