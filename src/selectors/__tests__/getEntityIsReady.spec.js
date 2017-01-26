import expect from 'expect'
import { schema } from 'normalizr'

import getEntityIsReady from '../getEntityIsReady'

const userSchema = new schema.Entity('user')

describe('getEntityIsReady', () => {
  it('should return a function', () => {
    expect(getEntityIsReady()).toBeA('function')
  })

  it('should be true when not fetching, creating, updating or deleting', () => {
    expect(getEntityIsReady()(userSchema, 1, {
      crudux: {
        meta: {
          user: {
            1: {
              isFetching: false,
              isCreating: false,
              isUpdating: false,
              isDeleting: false,
            },
          },
        },
      },
    })).toEqual(true)
  })

  it('should be false if fetching', () => {
    expect(getEntityIsReady()(userSchema, 1, {
      crudux: {
        meta: {
          user: {
            1: { isFetching: true },
          },
        },
      },
    })).toEqual(false)
  })

  it('should be false if creating', () => {
    expect(getEntityIsReady()(userSchema, 1, {
      crudux: {
        meta: {
          user: {
            1: { isCreating: true },
          },
        },
      },
    })).toEqual(false)
  })

  it('should be false if updating', () => {
    expect(getEntityIsReady()(userSchema, 1, {
      crudux: {
        meta: {
          user: {
            1: { isUpdating: true },
          },
        },
      },
    })).toEqual(false)
  })

  it('should be false if deleting', () => {
    expect(getEntityIsReady()(userSchema, 1, {
      crudux: {
        meta: {
          user: {
            1: { isDeleting: true },
          },
        },
      },
    })).toEqual(false)
  })

  it('should be true if no metadata, but entity exists', () => {
    expect(getEntityIsReady()(userSchema, 1, {
      crudux: {
        meta: { user: {} },
        entities: {
          user: {
            1: { id: 1, name: 'Matt' },
          },
        },
      },
    })).toEqual(true)
  })

  it('should be false if no metadata and entity doesn\'t exists', () => {
    expect(getEntityIsReady()(userSchema, 1, {
      crudux: {
        meta: { user: {} },
        entities: { user: {} },
      },
    })).toEqual(false)
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getEntityIsReady(getOtherMountPoint)(userSchema, 1, {
      otherMountPoint: {
        meta: {
          user: {
            1: { isDeleting: true },
          },
        },
      },
    })).toEqual(false)
  })
})
