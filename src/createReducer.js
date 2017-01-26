import { combineReducers } from 'redux'

import createEntitiesReducer from './reducers/createEntitiesReducer'
import createEntitiesMetadataReducer from './reducers/createEntitiesMetadataReducer'
import pagesReducer from './reducers/pagesReducer'
import pageMetadataReducer from './reducers/pageMetadataReducer'
import pageGroupReducer from './reducers/pageGroupReducer'


export default schemas =>
  combineReducers({
    entities: createEntitiesReducer(schemas),
    meta: createEntitiesMetadataReducer(schemas),
    pages: pagesReducer,
    pageMeta: pageMetadataReducer,
    pageGroup: pageGroupReducer,
  })
