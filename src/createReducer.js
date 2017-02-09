import { combineReducers } from 'redux'

import createEntitiesReducer from './reducers/createEntitiesReducer'
import createEntitiesMetadataReducer from './reducers/createEntitiesMetadataReducer'
import pagesReducer from './reducers/pagesReducer'
import pageGroupReducer from './reducers/pageGroupReducer'


export default schemas =>
  combineReducers({
    entities: createEntitiesReducer(schemas),
    meta: createEntitiesMetadataReducer(schemas),
    page: pagesReducer,
    pageGroup: pageGroupReducer,
  })
