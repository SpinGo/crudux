import expect from 'expect'
import { schema } from 'normalizr'

import getEntityMetadata from '../getEntityMetadata'

const userSchema = new schema.Entity('user')

describe('getEntityMetadata', () => {
  it('should return a function', () => {
    expect(getEntityMetadata()).toBeA('function')
  })

  it('should get entity metadata from the state', () => {
    expect(getEntityMetadata()(userSchema, 1, {
      crudux: {
        meta: {
          user: {
            1: { isFetching: false },
          },
        },
      },
    })).toEqual({ isFetching: false })
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getEntityMetadata(getOtherMountPoint)(userSchema, 1, {
      otherMountPoint: {
        meta: {
          user: {
            1: { isFetching: false },
          },
        },
      },
    })).toEqual({ isFetching: false })
  })
})
