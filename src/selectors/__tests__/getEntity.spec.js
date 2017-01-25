import expect from 'expect'
import { schema } from 'normalizr'

import getEntity from '../getEntity'

const userSchema = new schema.Entity('user')
const messageSchema = new schema.Entity('message', {
  user: userSchema,
})

describe('getEntity', () => {
  it('should return a function', () => {
    expect(getEntity()).toBeA('function')
  })

  it('should get an entity from the state', () => {
    expect(getEntity()(userSchema, 1, {
      crudux: {
        entities: {
          user: {
            1: { id: 1, name: 'Matt' },
          },
        },
      },
    })).toEqual({ id: 1, name: 'Matt' })
  })

  it('should denormalize the entity from the state', () => {
    expect(getEntity()(messageSchema, 1, {
      crudux: {
        entities: {
          user: {
            1: { id: 1, name: 'Matt' },
          },
          message: {
            1: { id: 1, user: 1, text: 'Thanks!' },
          },
        },
      },
    })).toEqual({
      id: 1,
      user: { id: 1, name: 'Matt' },
      text: 'Thanks!',
    })
  })

  it('should use getCrudState, if provided', () => {
    const getOtherMountPoint = state => state.otherMountPoint
    expect(getEntity(getOtherMountPoint)(userSchema, 1, {
      otherMountPoint: {
        entities: {
          user: {
            1: { id: 1, name: 'Matt' },
          },
        },
      },
    })).toEqual({ id: 1, name: 'Matt' })
  })
})
