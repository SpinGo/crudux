import expect from 'expect'
import { schema } from 'normalizr'

import {
  FETCH_RESOURCE_REQUEST,
} from '../actionTypes'

import {
  fetchRequest,
} from '../actions'


const testSchema = new schema.Entity('test')

describe('actions', () => {
  it('should create a fetchRequest action', () => {
    expect(fetchRequest(testSchema, 1))
      .toEqual({
        type: FETCH_RESOURCE_REQUEST,
        meta: { schema: testSchema.key, resourceId: 1 },
      })
  })
})
