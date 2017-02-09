import expect from 'expect'
import { schema } from 'normalizr'

import getPageGroupEntities from '../getPageGroupEntities'

const userSchema = new schema.Entity('user')

describe('getPageGroupEntities', () => {
  it('should return a function', () => {
    expect(getPageGroupEntities()).toBeA('function')
  })

  it('should get entities for current page', () => {
    expect(getPageGroupEntities()(userSchema, 'main', {
      crudux: {
        pageGroup: {
          main: { currentPage: 'user/page=1' },
        },
        page: {
          'user/page=1': {
            entities: [1],
          },
        },
        entities: {
          user: {
            1: { id: 1, name: 'Matt' },
          },
        },
      },
    })).toEqual([{ id: 1, name: 'Matt' }])
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getPageGroupEntities(getOtherMountPoint)(userSchema, 'main', {
      otherMountPoint: {
        pageGroup: {
          main: { currentPage: 'user/page=1' },
        },
        page: {
          'user/page=1': {
            entities: [1],
          },
        },
        entities: {
          user: {
            1: { id: 1, name: 'Matt' },
          },
        },
      },
    })).toEqual([{ id: 1, name: 'Matt' }])
  })
})
